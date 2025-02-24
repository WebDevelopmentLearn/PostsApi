import { Router } from "express";
import authenticateToken from "../middlewares/authenticateToken.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import multer from "multer";
import path from "node:path";
import {checkRole} from "../middlewares/checkRole.js";
import * as fs from "node:fs";


const router = Router();

// Настраиваем хранилище для загруженных файлов
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/'); // Папка для сохранения файлов
    },
    filename: (req, file, callback) => {
        console.log("req: ", req);
        callback(null, `${Date.now()}-${file.originalname}`); // Уникальное имя файла
    },
});

// Middleware для обработки загрузки
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Ограничение на размер файла (5MB)
    fileFilter: (req, file, callback) => {
        // Проверка типа файла (например, только изображения)
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extname && mimeType) {
            callback(null, true);
        } else {
            // cb(new Error('Only images are allowed!'));
            const error = new Error('Only images are allowed!');
            error.code = 400;
            return callback(error);
        }
    }
});

router.get("/", async (req, res, next) => {
    try {
        const posts = await Post.find().populate("author");
        res.json(posts);
    } catch (error) {
        next(error);
    }
});

//id - ObjectId
router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: "Invalid ID format"});
    }
    try {
        // const post = await Post.find({author: {_id: id}}).populate("author", "username");
        const posts = await Post.find({ author: id }).populate("author", "username");
        if (!posts || posts.length === 0) {
            return res.status(404).json({message: "No posts found for this author"});
        }
        res.json(posts);
    } catch (error) {
        next(error);
    }
});


router.delete("/:id", authenticateToken, async (req, res, next) => {
    const { id } = req.params;
    const user = req.user;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: "Invalid ID format"});
    }
    try {
        const deletedPost = await Post.findByIdAndDelete({ _id: id });
        if (!deletedPost) {
            return res.status(404).json({message: "Post not found"});
        }

        if (deletedPost.image) {
            await fs.unlink(path.join(`${process.cwd()}${deletedPost.image}`), (err) => {
                if (err) {
                    console.error("Error deleting image: ", err);
                }
            });
        }

        // console.log(post.author._id, user.id);
        // console.log(post.author._id.toString() === user.id);
        if (deletedPost.author._id.toString() !== user.id) {
            return res.status(403).json({message: "Forbidden: You can only delete your own posts"});
        }

        await User.updateOne({ _id: user.id }, { $pull: { posts: deletedPost.id } });

        res.json({
            message: "Post successfully deleted",
            deletedPost,
        });
    } catch (error) {
        next(error);
    }
});



router.post("/", authenticateToken, upload.single('image'), async (req, res, next) => {
    const { title, content } = req.body;
    const user = req.user;
    if (!title || !content) {
        return res.status(400).json({message: "All fields must be filled in"});
    }
    if (!user) {
        return res.status(403).json({message: "Forbidden: Invalid or expired token"});
    }
    try {
        const imagePaths = req.file ? `/uploads/${req.file.filename}` : null;
        const post = new Post({
            title,
            content,
            author: user.id,
            image: imagePaths,
        });

        await post.save();

        await User.updateOne({ _id: user.id }, { $push: { posts: post.id } });

        res.status(201).json({
            message: "Post successfully created",
            post,
        });
    } catch (error) {
        next(error);
    }
});



export default router;