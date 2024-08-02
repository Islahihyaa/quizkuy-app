import express from "express";
import { tryCatch } from "../utils/tryCatch.js";
import {
  getQuiz,
  createQuiz,
  getExistingQuiz,
  submitAnswerQuiz,
} from "../controller/quizController.js";

export const quizRouter = express.Router();

quizRouter.post("/api/create-quiz", tryCatch(createQuiz));
quizRouter.get("/api/get-quiz", tryCatch(getQuiz));
quizRouter.get("/api/get-existing-quiz", tryCatch(getExistingQuiz));
quizRouter.post("/api/submit-answer-quiz", tryCatch(submitAnswerQuiz));
