import express from "express";
import { tryCatch } from "../utils/tryCatch.js";
import {
  getQuiz,
  createQuiz,
} from "../controller/quizController.js";

export const quizRouter = express.Router();

quizRouter.post("/api/create-quiz", tryCatch(createQuiz));
quizRouter.get("/api/get-quiz", tryCatch(getQuiz));
