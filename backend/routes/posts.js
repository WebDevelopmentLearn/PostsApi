import { Router } from "express";
import authenticateToken from "../middlewares/authenticateToken.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import mongoose from "mongoose";

const router = Router();

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
        return res.status(400).send("Invalid ID format");
    }
    try {
        // const post = await Post.find({author: {_id: id}}).populate("author", "username");
        const posts = await Post.find({ author: id }).populate("author", "username");
        if (!posts || posts.length === 0) {
            return res.status(404).send("No posts found for this author");
        }
        res.json(posts);
    } catch (error) {
        next(error);
    }
});

router.post("/", authenticateToken, async (req, res, next) => {
    const { title, content } = req.body;
    const user = req.user;
    if (!title || !content) {
        return res.status(400).send("All fields must be filled in");
    }
    if (!user) {
        return res.status(403).send("Forbidden: Invalid or expired token");
    }
    try {
        const post = new Post({
            title,
            content,
            author: user.id,
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