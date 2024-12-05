import {Router} from "express";
import authenticateToken from "../middlewares/authenticateToken.js";
import {checkRole} from "../middlewares/checkRole.js";
import User from "../models/User.js";
import Post from "../models/Post.js";


const router = new Router();

router.get("/", authenticateToken, checkRole("admin"), async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.delete("/:id", authenticateToken, checkRole("admin"), async (req, res, next) => {
    const {id} = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        //if user has avatar and posts, delete them
        // if (user.avatar) {
        //     await fs.unlink(path.join(__dirname, "..", user.avatar));
        // }

        if (user.posts.length) {
            for (let post of user.posts) {
                await Post.findByIdAndDelete(post);
            }
        }


        res.status(200).json({
            message: `User ${user.username} successfully deleted`,
            user
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

export default router;