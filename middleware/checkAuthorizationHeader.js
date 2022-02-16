// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

// Any handler that does not return will effectively be considered "middleware", 
// continuing to execute future functions/routes until one returns, closing the response.
export function checkAuthorizationHeader(request)  {
  const secret = request.headers.get('Authorization');

  if (secret === null || secret === '') {
    const e = {
      message: 'Unauthorized',
      WWWAuthenticateHeader: 'Must set header "Authorization: Bearer <secret>"',
    }
  
    const unauthorizedResponse = new Response(e.message, { status: 401 });
    unauthorizedResponse.headers.append('WWWAuthenticateHeader', e.WWWAuthenticateHeader);
    
    return unauthorizedResponse;
  }
}
