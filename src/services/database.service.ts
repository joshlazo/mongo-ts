import * as mongoDB from "mongodb";

import * as dotenv from "dotenv";

export const collections: { games?: mongoDB.Collection } = {};

export async function connectToDatabase() {
    dotenv.config();

    const dbConn: string = process.env.DB_CONN_STRING as string;

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbConn);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    await db.command({
        "collMod": process.env.GAMES_COLLECTION_NAME,
        "validator": {
            $jsonSchema: {
                bsonType: "object",
                required: ["name", "price", "category"],
                additionalProperties: false,
                properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string"
                },
                price: {
                    bsonType: "number",
                    description: "'price' is required and is a number"
                },
                category: {
                    bsonType: "string",
                    description: "'category' is required and is a string"
                }
                }
            }
         }
    });

    const gamesCollection: mongoDB.Collection = db.collection(dbConn);

    collections.games = gamesCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`);
}