import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { Jwt } from "jsonwebtoken";
import { User } from "../models/User.model";
import { generateTokens } from "../utils/generateTokens";
import config from "../config";


//helper for cookie options

const cookieOptions = () => {
    const isProd = config.NODE_ENV === "production";
    return {
        httpOnly: true as const,
        secure: isProd,
        sameSite: isProd ? ("none" as const) : ("lax" as const),
    }
}

export const register = async(req:Request, res:Response) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) return res.status(400).json({ message: "Username, Email and password are required" });

        const exists = await User.findOne({ email});
        if (exists) return res.status(400).json({ message: "Email already exists" });

        const hashed = await bcrypt.hash(password, 12);
        const user = await User.create({ username, email, password:hashed });

        return res.status(201).json({ message: "User created", user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}