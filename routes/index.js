// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

export { createCollection, findCollectionByName, updateCollection, deleteCollection } from './collections';
export { createDatabase, findDatabaseByName, updateDatabase, deleteDatabase } from './databases';
export { createDocument, findDocumentByID, updateDocument, deleteDocument } from './documents';
export { evaluateQuery } from './query';