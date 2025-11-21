import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware";
import authRoutes from "../src/routes/auth.routes"
import cookieParser from "cookie-parser";

const app = express();


app.use(express.json());
app.use(cors());
app.use(cookieParser());


//api routes
app.use("/api/auth", authRoutes)

app.get("/health", (_, res) => res.json({ status: 'OK'}));

app.use(errorHandler)

export default app;