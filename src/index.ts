import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

interface User {
    id: number;
    name: string;
    email: string;
}

const users: User[] = [
    { id: 1, name: "John", email: "alice@gmail.com" },
    { id: 2, name: "Alice", email: "bob@gmail" },
];

app.get('/', lazo, (req: Request, res: Response) => {
    console.log(req.params);
    res.send("Hello, world!");
});

function lazo(req: any, res: any, next: any) {
    console.log('joshua lazo');
    // let joshua: Response;
    // // joshua.set("hello world");

    // joshua.set('Foo', ['bar', 'baz']);

    // return joshua.send('qweqwe');

    // return res;
    next();
}

app.get('/users', (req: Request, res: Response) => {
    res.json(users);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});