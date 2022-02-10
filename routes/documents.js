// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import faunadb from 'faunadb';
import { createClient } from '../utils';
import { getFaunaError } from '../utils';

// POST /collections/:name/documents
export async function createDocument(request)  {
  const client = createClient(request);
  const body = await request.json();
  const { name } = request.params;

  try {
    const { Create, Collection } = faunadb.query;

    const result = await client.query(
      Create(
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

// GET /collections/:name/documents/:id
export async function findDocumentByID(request)  {
  const client = createClient(request);
  const { name, id } = request.params;

  try {
    const { Collection, Get, Ref } = faunadb.query;

    const result = await client.query(
      Get(Ref(Collection(name), id))
    );

    return new Response(JSON.stringify(result), { status: 200 });

  } catch (e) {
    const faunaError = getFaunaError(e);

    return new Response(faunaError.description, { status: faunaError.status });
  }
}

// PUT /collections/:name/documents/:id
export async function updateDocument(request)  {
  const client = createClient(request);
  const { name, id } = request.params;
  const body = await request.json();

  try {
    const { Collection, Ref, Update } = faunadb.query;

    const result = await client.query(
      Update(
        Ref(Collection(name), id),
        body
      )
    );

    return new Response(JSON.stringify(result), { status: 200 });

  } catch (e) {
    const faunaError = getFaunaError(e);

    return new Response(faunaError.description, { status: faunaError.status });
  }
}

// DELETE /collections/:name/documents/:id
export async function deleteDocument(request)  {
  const client = createClient(request);
  const { name, id } = request.params;

  try {
    const { Collection, Delete, Ref } = faunadb.query;

    const result = await client.query(
      Delete(Ref(Collection(name), id))
    );

    return new Response(JSON.stringify(result), { status: 200 });

  } catch (e) {
    const faunaError = getFaunaError(e);

    return new Response(faunaError.description, { status: faunaError.status });
  }
}