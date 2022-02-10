// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import faunadb from 'faunadb';

// Any handler that does not return will effectively be considered "middleware", 
// continuing to execute future functions/routes until one returns, closing the response.
export function createClient(request)  {
  // We know this is set because this middleware is run *after* checkAuthorizationHeader.
  const secret = request.headers.get('X-Fauna-Secret');

  // Check for a specified domain for Region Groups. If not found, use the Classic endpoint.
  const domain = request.headers.get('X-Fauna-Domain') || 'db.fauna.com';

  return new faunadb.Client({
    secret,
    domain,
  });
}
