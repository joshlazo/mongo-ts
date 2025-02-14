import * as mongoDB from "mongodb";

import dotenv from "dotenv";

export const collections: { games?: mongoDB.Collection } = {};

export async function connectToDatabase() {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const gamesCollection: mongoDB.Collection = db.collection(process.env.GAMES_COLLECTION_NAME as string);

    collections.games = gamesCollection;

    console.log(`success`);
}