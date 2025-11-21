import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model";
import { generateTokens } from "../utils/generateTokens";
import config from "../config";

// Helper for cookie options
const cookieOptions = () => {
  const isProd = config.NODE_ENV === "production";
  return {
    httpOnly: true as const,
    secure: isProd,
    sameSite: isProd ? ("none" as const) : ("lax" as const),
  };
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: "Username, Email and password are required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ username, email, password: hashed });

    return res.status(201).json({
      message: "User created",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const { accessToken, refreshToken } = generateTokens(user._id.toString());

    // Store refresh token
    user.refreshTokens.push(refreshToken);
    await user.save();

    // Set cookies
    res.cookie("accessToken", accessToken, { ...cookieOptions(), maxAge: 15 * 60 * 1000 });
    res.cookie("refreshToken", refreshToken, { ...cookieOptions(), maxAge: 7 * 24 * 60 * 60 * 1000 });

    return res.json({
      message: "Logged in successfully",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken as string | undefined;

    if (refreshToken) {
      await User.updateOne({ refreshTokens: refreshToken }, { $pull: { refreshTokens: refreshToken } });
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.json({ message: "User logged out successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refreshToken as string | undefined;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    // Verify refresh token
    let payload: { userId: string };
    try {
      payload = jwt.verify(token, config.REFRESH_TOKEN_SECRET) as { userId: string };
    } catch (error) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const user = await User.findById(payload.userId);
    if (!user) return res.status(401).json({ message: "User not found" });

    // Check if token exists in DB
    if (!user.refreshTokens.includes(token)) {
      user.refreshTokens = [];
      await user.save();
      return res.status(403).json({ message: "Refresh token revoked" });
    }

    // Generate new token pair (rotation)
    const { accessToken, refreshToken } = generateTokens(user._id.toString());

    // Replace old refresh token with new one safely
    user.refreshTokens = user.refreshTokens.filter(t => t !== token);
    user.refreshTokens.push(refreshToken);
    await user.save();

    // Set cookies
    res.cookie("accessToken", accessToken, { ...cookieOptions(), maxAge: 15 * 60 * 1000 });
    res.cookie("refreshToken", refreshToken, { ...cookieOptions(), maxAge: 7 * 24 * 60 * 60 * 1000 });

    return res.json({ message: "Tokens refreshed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const anyReq = req as any;
    const userId = anyReq.userId as string | undefined;
    if (!userId) return res.status(401).json({ message: "Not authorized" });

    const user = await User.findById(userId).select("-password -refreshTokens");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
