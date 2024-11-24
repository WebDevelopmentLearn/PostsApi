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
const ENV = process.env.NODE_ENV || "development";

const corsOptions = {
    origin: function (origin, callback) {
        // Разрешаем запросы с этих двух источников
        if (origin === `http://${process.env.HOST_IP}` || origin === `http://${process.env.HOST_IP}:3000` || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // Разрешить отправку куков
};

async function startServer() {
    try {
        await connectToDatabase();
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        if (ENV !== "development") {
            app.use(cors(corsOptions));
        } else {
            app.use(
                cors({
                    origin: "http://localhost:3000", // Укажите точный адрес фронтенда
                    credentials: true, // Разрешить отправку куков
                })
            );
        }
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
            if (err instanceof multer.MulterError) {
                return res.status(400).json({
                    message: "File size should be less than 5MB",
                });
            } else if (err.code === 400) {
                return res.status(400).json({
                    message: err.message,
                });
            } else {
                return res.status(500).json({
                    message: "Internal Server Error",
                });
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