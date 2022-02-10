// import faunadb from 'faunadb';

// export async function createRole(client, role) {
//   client.query(
//     faunadb.query.CreateRole({
//       role.name,
//       role.permissions,
//     })
//   )
//     .then((response) => {
//       res.status(200).json(response);
//     })
//     .catch((error) => {
//       res.status(500).json(error);
//     });
// }