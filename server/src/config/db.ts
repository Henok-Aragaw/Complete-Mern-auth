import mongoose from "mongoose";
import config from "./index";

export const connectDB = async () => {
    try {
        if (!config.MONGO_URI) {
            throw new Error("MONGO_URI is missing!");
        }

        await mongoose.connect(config.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};
