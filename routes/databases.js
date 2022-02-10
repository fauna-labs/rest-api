// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import faunadb from 'faunadb';
import { createClient } from '../utils';
import { getFaunaError } from '../utils';

// POST /databases
export async function createDatabase(request)  {
  const client = createClient(request);
  const body = await request.json();
  const name = body.name;

  try {
    const { CreateDatabase } = faunadb.query;

    const result = await client.query(
      CreateDatabase({
        name: name
      })
    );

    return new Response(JSON.stringify(result), { status: 200 });

  } catch (e) {
    const faunaError = getFaunaError(e);

    return new Response(faunaError.description, { status: faunaError.status });
  }
}

// GET /databases/:name
export async function findDatabaseByName(request)  {
  const client = createClient(request);
  const { name } = request.params;

  try {
    const { Database, Get } = faunadb.query;

    const result = await client.query(
      Get(Database(name))
    );

    return new Response(JSON.stringify(result), { status: 200 });

  } catch (e) {
    const faunaError = getFaunaError(e);

    return new Response(faunaError.description, { status: faunaError.status });
  }
}

// PUT /databases/:name
export async function updateDatabase(request)  {
  const client = createClient(request);
  const { name } = request.params;
  const body = await request.json();

  try {
    const { Database, Update } = faunadb.query;

    const result = await client.query(
      Update(
        Database(name),
        body
      )
    );

    return new Response(JSON.stringify(result), { status: 200 });

  } catch (e) {
    const faunaError = getFaunaError(e);

    return new Response(faunaError.description, { status: faunaError.status });
  }
}

// DELETE /databases/:name
export async function deleteDatabase(request)  {
  const client = createClient(request);
  const { name } = request.params;

  try {
    const { Database, Delete } = faunadb.query;

    const result = await client.query(
      Delete(Database(name))
    );

    return new Response(JSON.stringify(result), { status: 200 });

  } catch (e) {
    const faunaError = getFaunaError(e);

    return new Response(faunaError.description, { status: faunaError.status });
  }
}