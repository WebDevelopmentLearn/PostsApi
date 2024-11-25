import {Router} from "express";
import authenticateToken from "../middlewares/authenticateToken.js";
import {checkRole} from "../middlewares/checkRole.js";
import User from "../models/User.js";


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

export default router;