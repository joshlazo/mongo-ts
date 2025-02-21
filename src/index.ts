import express, { Request, Response } from 'express';

import { connectToDatabase } from './services/database.service';
import { gamesRouter } from './routes/games.router';

const app = express();
const port = 8080;

// app.use(express.json());

interface User {
    id: number;
    name: string;
    email: string;
}

console.log("wassap123");

const users: User[] = [
    { id: 1, name: "John", email: "alice@gmail.com" },
    { id: 2, name: "Alice", email: "bob@gmail" },
];

connectToDatabase()
    .then(() => {
        app.use("/games", gamesRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });

// app.get('/', lazo, (req: Request, res: Response) => {
//     console.log(req.params);
//     dotenv.config()

//     console.log(process.env.DB_NAME);

//     res.send("Hello, world!");
// });

// function lazo(req: any, res: any, next: any) {
//     console.log('joshua lazo');
//     // let joshua: Response;
//     // // joshua.set("hello world");

//     // joshua.set('Foo', ['bar', 'baz']);

//     // return joshua.send('qweqwe');

//     // return res;
//     next();
// }

// app.get('/users', (req: Request, res: Response) => {
//     res.json(users);
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });