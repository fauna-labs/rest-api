// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

// import faunadb from 'faunadb';
import { Router } from 'itty-router';
import { checkAuthorizationHeader } from './middleware';

import { createCollection, findCollectionByID } from './routes';
// import { createRole } from './routes';



//     const body = await request.json();
//     const udf = body.function;
//     const args = body.arguments;

//     const url = new URL(request.url).pathname.toLowerCase();

//     let domain = 'db.fauna.com';

//     // Route to the correct endpoint based on the URL
//     if (url.substring(0, 3) === '/eu') {
//       domain = 'db.eu.fauna.com';
//     } else if (url.substring(0, 3) === '/us') {
//       domain = 'db.us.fauna.com';
//     }

//     const faunaClient = new faunadb.Client({
//       secret: secret,
//       domain: domain,
//       fetch: customFetch,
//     });

//     const { Call } = faunadb.query;

//     const result = await faunaClient.query(
//       Call(udf, args)
//     );

//     return new Response(result, { status: 200 });

//   } catch (e) {

//     return new Response(e.message, { status: 500 });

//   }

const router = Router();

// Middleware for all routes.
// Check for presence of the `X-Fauna-Secret` header.
router.all('*', (request) => checkAuthorizationHeader(request));

// Access Provider routes
// router.post('/accessProviders', new Response('Created AccessProvider!', { status: 200 }));

// Collection routes
router.post('/collections', async (request) => await createCollection(request));
router.get('/collections/:id', async ({ params }) => await findCollectionByID(params.id));

// Database routes
// router.post('/databases', new Response('Created Database!', { status: 200 }));

// UDF routes
// router.post('/functions', new Response('Created UDF!', { status: 200 }));

// Index routes
// router.post('/indexes', new Response('Created Index!', { status: 200 }));

// Key routes
// router.post('/keys', new Response('Created Key!', { status: 200 }));

// Query route
// router.post('/query', new Response({ query_metadata: { ops: "Lots" }, result: { message: "Hello, world!" } }, { status: 200 }));

// Role routes
// router.post('/roles', new Response('Created Role!', { status: 200 }));

// Deprecated routes
// router.post('/udf', new Response('The /udf endpoint is deprecated.', { status: 200 }));

// Catch-all route
router.all('*', () => new Response('Not Found.', { status: 404 }));

addEventListener('fetch', event =>
  event.respondWith(router.handle(event.request))
);

// const validPaths = [
//   '/udf',
//   '/eu/udf',
//   '/us/udf'
// ]

// addEventListener('fetch', event => {
//   try {
//     const request = event.request;
//     const url = new URL(request.url);

//     // Check for the authentication token.
//     const secret = request.headers.get('X-Fauna-Secret');
//     if (secret === null) {
//       return event.respondWith(new Response('Unauthorized', { status: 401 }));
//     }

//     // Check for a valid path.
//     if (!validPaths.includes(url.pathname.toLowerCase())) {
//       return event.respondWith(new Response('Not Found', { status: 404 }));
//     }

//     // Check for a valid method.
//     if (request.method.toUpperCase() !== 'POST') {
//       return event.respondWith(new Response('Method Not Allowed', { status: 405 }));
//     }

//     // All checks pass. Handle the request.
//     return event.respondWith(handleRequest(request));

//   } catch (e) {
//     return event.respondWith(new Response(e.message, { status: 500 }));
//   }
// });

// async function handleRequest(request) {

//   try {
//     const secret = request.headers.get('X-Fauna-Secret');
//     const body = await request.json();
//     const udf = body.function;
//     const args = body.arguments;

//     const url = new URL(request.url).pathname.toLowerCase();

//     let domain = 'db.fauna.com';

//     // Route to the correct endpoint based on the URL
//     if (url.substring(0, 3) === '/eu') {
//       domain = 'db.eu.fauna.com';
//     } else if (url.substring(0, 3) === '/us') {
//       domain = 'db.us.fauna.com';
//     }

//     const faunaClient = new faunadb.Client({
//       secret: secret,
//       domain: domain,
//       fetch: customFetch,
//     });

//     const { Call } = faunadb.query;

//     const result = await faunaClient.query(
//       Call(udf, args)
//     );

//     return new Response(result, { status: 200 });

//   } catch (e) {

//     return new Response(e.message, { status: 500 });

//   }
// }
