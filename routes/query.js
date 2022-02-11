// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

// import faunadb from 'faunadb';
// import { createClient } from '../utils';
import { getFaunaError } from '../utils';

// POST /query
export async function evaluateQuery(request)  {
  // const client = createClient(request);
  // const { query, args } = await request.json();
  const { query } = await request.json();

  const wasm = await import('@fauna-labs/fql-parser');

  try {
    const wireProtocolQuery = wasm.serialize_fql_query(query);

    const init = {
      headers: {
        'Authorization': `Bearer ${request.headers.get('X-Fauna-Secret')}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: wireProtocolQuery,
    }

    const domain = request.headers.get('X-Fauna-Domain') || 'db.fauna.com';
    const result = await fetch(
      `https://${domain}/`,
      init
    );

    return new Response(JSON.stringify(await result.json()), { status: 200 });

  } catch (e) {
    // return new Response(e, { status: 499 });
    const faunaError = getFaunaError(e);

    return new Response(faunaError.description, { status: faunaError.status });
  }
}
