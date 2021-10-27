// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import faunadb from 'faunadb';
import { customFetch } from './utils.js';

const validPaths = [
  '/udf',
  '/eu/udf',
  '/us/udf'
]

addEventListener('fetch', event => {
  try {
    const request = event.request;
    const url = new URL(request.url);

    // Check for the authentication token.
    const secret = request.headers.get('X-Fauna-Secret');
    if (secret === null) {
      return event.respondWith(new Response('Unauthorized', { status: 401 }));
    }

    // Check for a valid path.
    if (!validPaths.includes(url.pathname.toLowerCase())) {
      return event.respondWith(new Response('Not Found', { status: 404 }));
    }

    // Check for a valid method.
    if (request.method.toUpperCase() !== 'POST') {
      return event.respondWith(new Response('Method Not Allowed', { status: 405 }));
    }

    // All checks pass. Handle the request.
    return event.respondWith(handleRequest(request));

  } catch (e) {
    return event.respondWith(new Response(e.message, { status: 500 }));
  }
});

async function handleRequest(request) {

  try {
    const secret = request.headers.get('X-Fauna-Secret');
    const body = await request.json();
    const udf = body.function;
    const args = body.arguments;

    const url = new URL(request.url).pathname.toLowerCase();

    let domain = 'db.fauna.com';

    // Route to the correct endpoint based on the URL
    if (url.substring(0, 3) === '/eu') {
      domain = 'db.eu.fauna.com';
    } else if (url.substring(0, 3) === '/us') {
      domain = 'db.us.fauna.com';
    }

    const faunaClient = new faunadb.Client({
      secret: secret,
      domain: domain,
      fetch: customFetch,
    });

    const { Call } = faunadb.query;

    const result = await faunaClient.query(
      Call(udf, args)
    );

    return new Response(result, { status: 200 });

  } catch (e) {

    return new Response(e.message, { status: 500 });

  }
}
