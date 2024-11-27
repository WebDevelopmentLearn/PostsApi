import {model, Schema} from "mongoose";


const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 1800,// 30 minutes
    },
});

const Token = model("Token", tokenSchema);

export default Token;