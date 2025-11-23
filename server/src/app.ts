import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware";
import authRoutes from "../src/routes/auth.routes"
import cookieParser from "cookie-parser";
import config from "./config";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: config.CLIENT_URL,
    credentials: true
}));

app.use(cookieParser());


//api routes
app.use("/api/auth", authRoutes)

app.get("/health", (_, res) => res.json({ status: 'OK'}));

app.use(errorHandler)

export default app;