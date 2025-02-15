import * as mongoDB from "mongodb";

import * as dotenv from "dotenv";

export const collections: { games?: mongoDB.Collection } = {};

export async function connectToDatabase() {
    dotenv.config();

    const dbConn: string = process.env.DB_CONN_STRING as string;

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbConn);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const gamesCollection: mongoDB.Collection = db.collection(dbConn);

    collections.games = gamesCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`);
}