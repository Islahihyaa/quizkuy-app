import axios from "axios";
import { ValidationError } from "../utils/error.js";

export const createQuiz = async (req, res) => {
  const { amount, category, difficulty, type } = req.body;
  if (!amount || !category || !difficulty || !type) {
    throw new ValidationError("Field tidak boleh kosong", 400);
  }

  res.status(200).json({
    success: true,
    data: {
      amount,
      category,
      difficulty,
      type,
    },
  })
};

export async function getQuiz(req, res) {
  const { amount, category, difficulty, type } = req.query;

  if (!amount || !category || !difficulty || !type) {
    throw new ValidationError("Field tidak boleh kosong", 400);
  }

  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

  const response = await axios.get(url);
  res.status(200).json(response.data);
}
