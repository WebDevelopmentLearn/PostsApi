import express from 'express';
import "dotenv/config";
import cors from 'cors';
import {connectToDatabase} from "./config/db.js";
import authRouter from "./routes/auth.js";
import postsRouter from "./routes/posts.js";

import cookieParser from "cookie-parser";
import multer from "multer";
import * as path from "node:path";

const app = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectToDatabase();
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(
            cors({
                origin: "http://localhost:3000", // Укажите точный адрес фронтенда
                credentials: true, // Разрешить отправку куков
            })
        );
        // Используем cookie-parser для работы с куками
        app.use(cookieParser());




        app.get('/', (req, res, next) => {
            res.send('Hello World!');
        });

        app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
        app.use(express.static('uploads'))
        app.use('/auth', authRouter);
        app.use('/posts', postsRouter);


        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Something broke! Please see the console for more information.');
        });


        // print all the routes
        app._router.stack.forEach((r) => {
            if (r.route && r.route.path) {
                console.log(r.route.path);
            }
        });


        app.listen(PORT, () => {
            console.log(`Server is running at: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server: ", error);
        process.exit(1);
    }
}

startServer();