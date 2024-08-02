import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { ValidationError } from "../utils/error.js";
import { prisma } from "../utils/prismaClient.js";

export const createQuiz = async (req, res) => {
  const { amount, category, difficulty, type, encode, userId } = req.body;

  if (!amount || !category || !difficulty || !type || !userId) {
    throw new ValidationError("Field tidak boleh kosong", 400);
  }

  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}&encode=${
    encode || "default"
  }`;

  const response = await axios.get(url);
  const quizData = response.data;

  const decodedResults = quizData.results.map((quiz) => ({
    ...quiz,
    category: decodeURIComponent(quiz.category),
    question: decodeURIComponent(quiz.question),
    correct_answer: decodeURIComponent(quiz.correct_answer),
    incorrect_answers: quiz.incorrect_answers.map((answer) =>
      decodeURIComponent(answer)
    ),
  }));

  const quizCategory =
    decodedResults.length > 0 ? decodedResults[0].category : "Unknown Category";
  const quizDifficulty =
    decodedResults.length > 0
      ? decodedResults[0].difficulty
      : "Unknown Difficulty";

  const id = uuidv4();
  const title = `Quiz ${quizCategory}-${quizDifficulty}`;

  const modifiedResponse = {
    id,
    title,
    response_code: quizData.response_code,
    results: decodedResults,
  };

  try {
    const savedQuiz = await prisma.quiz.create({
      data: {
        id: modifiedResponse.id,
        title: modifiedResponse.title,
        response_code: modifiedResponse.response_code,
        user: {
          connect: {
            user_id: userId,
          },
        },
        questions: {
          create: modifiedResponse.results.map((result) => ({
            type: result.type,
            difficulty: result.difficulty,
            category: result.category,
            question: result.question,
            correct_answer: result.correct_answer,
            incorrectAnswers: {
              create: result.incorrect_answers.map((answer) => ({
                text: answer,
              })),
            },
          })),
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Error saving quiz to database" });
  }

  res.status(200).json({
    success: true,
    data: {
      quizId: id,
    },
  });
};

export const getQuiz = async (req, res) => {
  const { userId, quizId } = req.query;

  if (!userId) {
    throw new ValidationError("User tidak valid", 400);
  }

  if (!quizId) {
    throw new ValidationError("Quiz tidak valid", 400);
  }

  const quizData = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: {
        include: {
          incorrectAnswers: true,
        },
      },
    },
  });

  if (!quizData) {
    throw new ValidationError("Quiz tidak ditemukan", 400);
  }

  res.status(200).json(quizData);
};

export const submitAnswerQuiz = async (req, res) => {
  try {
    const { id, currentIndex, question, answer, selectedAnswer } = req.query;

    if (!id || !question || !answer || !selectedAnswer || !currentIndex) {
      throw new ValidationError("Field tidak boleh kosong", 400);
    }

    const answers = Array.isArray(answer) ? answer : [answer];

    res.status(200).json({
      success: true,
      data: {
        id,
        currentIndex,
        question,
        answers,
        selectedAnswer,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getExistingQuiz = async (req, res) => {
  const { quizId } = req.query;
  if (!quizId) {
    throw new ValidationError("Quiz tidak ditemukan", 400);
  }

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: {
        include: {
          incorrectAnswers: true,
        },
      },
    },
  });

  if (!quiz) {
    return res.status(404).json({ error: "Quiz tidak ditemukan" });
  }

  // Format data untuk dikirim ke front-end
  const formattedQuiz = {
    id: quiz.id,
    title: quiz.title,
    response_code: quiz.response_code,
    results: quiz.questions.map((question) => ({
      type: question.type,
      difficulty: question.difficulty,
      category: question.category,
      question: question.question,
      correct_answer: question.correct_answer,
      incorrect_answers: question.incorrectAnswers.map((ia) => ia.text),
    })),
  };

  res.status(200).json(formattedQuiz);
};
