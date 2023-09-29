import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  // await listDatabases(client);
} catch (e) {
  console.error(e);
}

/**
 * Print the names of all available databases
 * @param {MongoClient} client A MongoClient that is connected to a cluster
 */
// async function listDatabases(client) {
//   const databasesList = await client.db().admin().listDatabases();

//   console.log("Databases:");
//   databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
// }

let db = conn.db("sample_training");

export default db;
