// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

// Any handler that does not return will effectively be considered "middleware", 
// continuing to execute future functions/routes until one returns, closing the response.
export { checkAuthorizationHeader } from './checkAuthorizationHeader';
