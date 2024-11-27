import { Router } from "express";
import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import multer from "multer";
import path from "node:path";
import {sendEmail} from "../config/gmailtransporter.js";
import Token from "../models/Token.js";
import crypto from "crypto";

const router = Router();
const jwtSecret = process.env.JWT_SECRET;

async function checkUserIsAlreadyRegistered(req, res, next) {
    const { username, email } = req.body;
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) return res.status(400).send("User already registered");
    next();
}

// Настраиваем хранилище для загруженных файлов
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/avatars/'); // Папка для сохранения файлов
    },
    filename: (req, file, callback) => {
        //Расширение файла
        const ext = path.extname(file.originalname);
        // console.log("ext", ext);
        callback(null, `${req.user.username}${ext}`); // Уникальное имя файла
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



router.post("/register", checkUserIsAlreadyRegistered, async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).send("All fields must be filled in");

    try {
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            role: "user",
        });

        await user.save();

        res.status(201).json({
            message: `Successfully registered`,
        });
    } catch (error) {
        console.error("Error registering user: ", error);
        next(error);
    }
});
//authenticateToken
//Bearer token
// {
//     "message": "User 007killer2 successfully logged in",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2UyZWEwYjBlNmY3OTQzMWIwYjQ1YiIsInVzZXJuYW1lIjoiMDA3a2lsbGVyMiIsImlhdCI6MTczMjEzMTkzMiwiZXhwIjoxNzMyMTM1NTMyfQ.lCZDWU0WnU0h_ZkDu4s31dvDbvLuBLLf8sj2gATJ_5k"
// }
const emailPattern = /.+\@.+\..+/;
router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).send("All fields must be filled in");

    try {
        const isEmail = emailPattern.test(username);
        const filter = isEmail ? { email: username } : { username };
        const user = await User.findOne(filter);

        if (!user) return res.status(404).send("Invalid username or password");

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) return res.status(401).json({
            message: "Invalid username or password",
        });

        const token = jwt.sign({
            id: user._id,
            username: user.username,
            role: user.role,
        }, jwtSecret, {
            expiresIn: "1h",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production_secure",
            sameSite: "strict",
        });

        res.json({
            message: `User ${user.username} successfully logged in`,
            token,
        });

    } catch (error) {
        console.error("Error logging in: ", error);
        next(error);
    }
});

router.get("/profile", authenticateToken, async(req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        // const imagePaths = req.file ? `/uploads/${req.file.filename}` : null;
        if (!user.avatar) {
            user.avatar = "/public/avatars/default-avatar.png";
        }
        const { id, username, email, role, avatar } = user;
        res.json({ id, username, email, role, avatar });

    } catch (error) {
        console.error("Error getting user data: ", error);
        next(error);
    }
});

router.put("/upload-avatar", authenticateToken, upload.single("avatar"), async(req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        const imagePaths = req.file ? `/public/avatars/${req.file.filename}` : null;
        user.avatar = imagePaths;
        await user.save();
        res.json({
            message: "Avatar uploaded successfully",
            avatar: user.avatar,
        });
    } catch (error) {
        console.error("Error uploading avatar: ", error);
        next(error);
    }
});


router.put("/change-password", authenticateToken, async(req, res, next) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    if (!currentPassword || !newPassword || !confirmNewPassword) return res.status(400).send("All fields must be filled in");
    if (newPassword !== confirmNewPassword) return res.status(400).send("Passwords do not match");

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).send("User not found");

        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) return res.status(401).send("Invalid current password");

        const salt = 10;
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.json({
            message: "Password changed successfully",
        });

    } catch (error) {
        console.error("Error changing password: ", error);
        next(error);
    }
});


router.post("/forgot-password", async (req, res, next) => {
    const {email} = req.body;
    if (!email) return res.status(400).send("Email field must be filled in");
    try {

        const user = await User.findOne({ email });
        if (!user) return res.status(404).send("User not found");

        let token = await Token.findOne({ userId: user._id });
        if (token) await token.deleteOne();

        let resetToken = crypto.randomBytes(32).toString("hex");
        const hash = await bcrypt.hash(resetToken, 10);
        await new Token({
            userId: user._id,
            token: hash,
            createdAt: Date.now(),
        }).save();

        // const link = `http://localhost:3000/reset-password/${user._id}/${resetToken}`;
        const link = `http://${process.env.HOST_IP ?? "localhost"}:3000/reset-password?token=${resetToken}&id=${user._id}`;


        await sendEmail(
            user.email,
            "Password recovery",
            `If you requested a password recovery, click on the link below. If not, ignore this email.`,
            `
            <h1>Your recovery link: ${link}</h1>
            `
        )

        res.json({
            message: "Recovery link sent successfully",
        });

    } catch (error) {
        console.error("Error recovering password: ", error);
        next(error);
    }
});


router.post("/reset-password", async (req, res, next) => {
    const {token, id, newPassword, confirmNewPassword} = req.body;

    console.log("Token: ", token);
    console.log("Id: ", id);
    console.log("Params: ", req.params);
    if (!newPassword || !confirmNewPassword) return res.status(400).send("All fields must be filled in");
    if (!token) return res.status(400).send("Invalid token");
    try {
        let passwordResetToken = await Token.findOne({ userId: id });
        if (!passwordResetToken) return res.status(403).send("Invalid or expired token");

        const isValid = await bcrypt.compare(token, passwordResetToken.token);
        if (!isValid) return res.status(403).send("Invalid or expired token");

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.updateOne(
            { _id: id },
            { $set: { password: hashedPassword } },
            { new: true }
        );

        const user = await User.findById(id);

        await sendEmail(
            user.email,
            "Password reset",
            `Your password has been successfully reset.`,
            `
            <h1>Your password has been successfully reset.</h1>
            `
        )

        await passwordResetToken.deleteOne();

        res.json({
            message: "Password reset successfully",
        });

    } catch (error) {
        console.error("Error resetting password: ", error);
        next(error);
    }
});




router.post("/logout", (req, res) => {
    res.clearCookie("token").send("Logged out successfully");
});

export default router;