// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import faunadb from 'faunadb';
import { createClient } from '../utils';
import { getFaunaError } from '../utils';

// POST /collections
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

// GET /collections/:name
export async function findCollectionByName(request)  {
  const client = createClient(request);
  const { name } = request.params;

  try {
    const { Collection, Get } = faunadb.query;

    const result = await client.query(
      Get(Collection(name))
    );

    return new Response(JSON.stringify(result), { status: 200 });

  } catch (e) {
    const faunaError = getFaunaError(e);

    return new Response(faunaError.description, { status: faunaError.status });
  }
}

// PUT /collections/:name
export async function updateCollection(request)  {
  const client = createClient(request);
  const { name } = request.params;
  const body = await request.json();

  try {
    const { Collection, Update } = faunadb.query;

    const result = await client.query(
      Update(
        Collection(name),
        body
      )
    );

    return new Response(JSON.stringify(result), { status: 200 });

  } catch (e) {
    const faunaError = getFaunaError(e);

    return new Response(faunaError.description, { status: faunaError.status });
  }
}

// DELETE /collections/:name
export async function deleteCollection(request)  {
  const client = createClient(request);
  const { name } = request.params;

  try {
    const { Collection, Delete } = faunadb.query;

    const result = await client.query(
      Delete(Collection(name))
    );

    return new Response(JSON.stringify(result), { status: 200 });

  } catch (e) {
    const faunaError = getFaunaError(e);

    return new Response(faunaError.description, { status: faunaError.status });
  }
}