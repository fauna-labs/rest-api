// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import { getFaunaError } from '../utils';

// POST /query
export async function evaluateQuery(request)  {
  const { query } = await request.json();

  const wasm = await import('@fauna-labs/fql-parser');

  try {
    const wireProtocolQuery = wasm.serialize_fql_query(query);

    const init = {
      headers: {
        'Authorization': `Bearer ${request.headers.get('Authorization')}`,
        'Content-Type': 'application/json',
        'X-Driver-Env': 'restapi-query',
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
    const faunaError = getFaunaError(e);

    return new Response(faunaError.description, { status: faunaError.status });
  }
}
