// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import faunadb from 'faunadb';
import { createClient } from '../utils';
import { getFaunaError } from '../utils';

export async function createCollection(request)  {
  const client = createClient(request);
  const body = await request.json();
  const name = body.name;

  try {
    const { CreateCollection } = faunadb.query;

    const result = await client.query(
      CreateCollection({
        name: name
      })
    );

    return new Response(JSON.stringify(result), { status: 200 });

  } catch (e) {
    const faunaError = getFaunaError(e);

    return new Response(faunaError.description, { status: faunaError.status });
  }
}

export async function findCollectionByID(id)  {
  return new Response(`Found Collection(${id})!`, { status: 200 });
}
