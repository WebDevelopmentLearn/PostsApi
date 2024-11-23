import mongoose from 'mongoose';
import "dotenv/config";

const MONGO_URI = process.env.MONGO_URI;

async function connectToDatabase() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected successfully to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB: ", error);
        throw error;
    }
}

export {connectToDatabase};