import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import config from "../config";

export interface AuthRequest extends Request {
    userId?:string;
}

export const authMiddleware = (req:AuthRequest, res:Response, next: NextFunction) => {
    try {
       const token = req.cookies?.accessToken as string | undefined;
       if (!token) return res.status(401).json({ message: "No access token" });

       const payload = jwt.verify(token, config.ACCESS_TOKEN_SECRET) as { userId: string };
       req.userId = payload.userId;
       next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}