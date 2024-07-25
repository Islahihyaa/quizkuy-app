import express from "express";
import { tryCatch } from "../utils/tryCatch.js";
import { login, register } from "../controller/authController.js";

export const authRouter = express.Router();

authRouter.post("/user/register", tryCatch(register));
authRouter.post("/user/login", tryCatch(login));
