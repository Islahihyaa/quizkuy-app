import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { authRouter } from "./routes/authRoute.js";
import { quizRouter } from "./routes/quizRoute.js";
import { ValidationError } from "./utils/error.js";

configDotenv();

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRouter);

app.use(quizRouter);

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }
  return res
    .status(500)
    .json({ success: false, message: "Internal Server Error" });
});

export { app };
