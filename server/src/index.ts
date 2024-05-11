import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import * as database from '@configs/mongo.config';
import envConfig from '@configs/env.config';
import { route } from '@routes/index';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { socketConfig } from './sockets/auction.socket';
import fileUpload from 'express-fileupload';
dotenv.config();

const app: Express = express();
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    }),
);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(
    express.urlencoded({
        extended: true,
        limit: '50mb',
    }),
);
app.use(morgan('common'));
app.use(cookieParser());
app.use(
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
    }),
);
route(app);
app.get('/', (req: Request, res: Response) => {
    res.status(200).json('Hello everyone, this is auction app');
});
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
    },
});
socketConfig(io);

const port: number | string = envConfig.PORT || 4848;

server.listen(port, async () => {
    await database.mongoConnect();
    console.log('[database]: Database connect successfully!');
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
