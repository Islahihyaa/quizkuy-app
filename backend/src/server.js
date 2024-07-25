import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { authRouter } from "./routes/authRoute.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

configDotenv();

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(authMiddleware);

export { app };
