import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
    },
    avatar: {
        type: String,
        default: "/public/avatars/avatar_example.png",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
});

const User = mongoose.model("User", userSchema);

export default User;