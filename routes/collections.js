// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

export async function createCollection(request)  {
  const body = await request.json();
  const name = body.name;

  return new Response(`Created Collection(${name})!`, { status: 200 });
}

export async function findCollectionByID(id)  {
  return new Response(`Found Collection(${id})!`, { status: 200 });
}
