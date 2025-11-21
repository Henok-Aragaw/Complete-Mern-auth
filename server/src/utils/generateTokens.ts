import jwt from "jsonwebtoken"
import config from "../config";

interface Tokens{
    accessToken: string;
    refreshToken: string;
}

export const generateTokens = (userId: string): Tokens => {
    const accessToken = jwt.sign({ userId}, config.ACCESS_TOKEN_SECRET, {
        expiresIn: config.ACCESS_TOKEN_EXPIRES as jwt.SignOptions["expiresIn"],

    });

    const refreshToken = jwt.sign({ userId }, config.REFRESH_TOKEN_SECRET, {
        expiresIn: config.REFRESH_TOKEN_EXPIRES as jwt.SignOptions["expiresIn"],
    });

    return { accessToken, refreshToken };
}