// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import { Router } from 'itty-router';

const router = Router();

// Middleware for all routes.
import { checkAuthorizationHeader } from './middleware';
// Check for presence of the `X-Fauna-Secret` header.
router.all('*', (request) => checkAuthorizationHeader(request));

// Resource-specific routes

// Access Provider routes
// router.post('/accessProviders', new Response('Created AccessProvider!', { status: 200 }));

// Collection routes
import { createCollection, findCollectionByName, updateCollection, deleteCollection } from './routes';
router.post('/collections', async (request) => await createCollection(request));
router.get('/collections/:name', async (request) => await findCollectionByName(request));
router.put('/collections/:name', async (request) => await updateCollection(request));
router.delete('/collections/:name', async (request) => await deleteCollection(request));

// Database routes
import { createDatabase, findDatabaseByName, updateDatabase, deleteDatabase } from './routes';
router.post('/databases', async (request) => await createDatabase(request));
router.get('/databases/:name', async (request) => await findDatabaseByName(request));
router.put('/databases/:name', async (request) => await updateDatabase(request));
router.delete('/databases/:name', async (request) => await deleteDatabase(request));

// Document routes
import { createDocument, findDocumentByID, updateDocument, deleteDocument } from './routes';
router.post('/collections/:name/documents', async (request) => await createDocument(request));
router.get('/collections/:name/documents/:id', async (request) => await findDocumentByID(request));
router.put('/collections/:name/documents/:id', async (request) => await updateDocument(request));
router.delete('/collections/:name/documents/:id', async (request) => await deleteDocument(request));

// UDF routes
// router.post('/functions', new Response('Created UDF!', { status: 200 }));

// Index routes
// router.post('/indexes', new Response('Created Index!', { status: 200 }));

// Key routes
// router.post('/keys', new Response('Created Key!', { status: 200 }));

// Query route
// router.post('/query', new Response({ query_metadata: { ops: "Lots" }, result: { message: "Hello, world!" } }, { status: 200 }));

// Role routes
// router.post('/roles', new Response('Created Role!', { status: 200 }));

// Catch-all route
router.all('*', () => new Response('Global Not Found', { status: 404 }));

addEventListener('fetch', event =>
  event.respondWith(router.handle(event.request))
);
