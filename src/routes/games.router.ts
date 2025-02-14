import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../database.service";
import Game from "../models/game";

export const gamesRouter = express.Router();

gamesRouter.use(express.json());

gamesRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const games = (await collections.games?.find({}).toArray());

        res.status(200).send(games);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

gamesRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {

        const query = { _id: new ObjectId(id) };
        const game = (await collections.games.findOne(query)) as Game;

        if (game) {
            res.status(200).send(game);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});