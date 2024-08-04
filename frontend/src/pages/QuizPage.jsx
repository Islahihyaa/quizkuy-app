import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Countdown from "../components/ui/Countdown";
import { QuizContext } from "../contexts/QuizContext";
import { StoreContext } from "../contexts/StoreContext";
import Question from "../components/quizPages/Question";
import ButtonSetting from "../components/ui/ButtonSetting";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import SettingPopup from "../components/modals/SettingPopup";

const QuizPage = () => {
  const { url } = useContext(StoreContext);
  const { quizParams } = useContext(QuizContext);
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCountdown, setShowCountdown] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState(null);

  const fetchQuizData = async (quizId, userId, saveToLocalStorage = true) => {
    try {
      const res = await axios.get(`${url}/api/get-quiz`, {
        params: { quizId, userId },
      });

      const quizData = res.data.questions.map((quiz) => ({
        difficulty: quiz.difficulty,
        category: quiz.category,
        question: quiz.question,
        correct_answer: quiz.correct_answer,
        incorrect_answers: quiz.incorrectAnswers.map((ia) => ia.text),
      }));

      if (saveToLocalStorage) {
        localStorage.setItem(
          "currentQuiz",
          JSON.stringify({
            currentIndex: 0,
            title: res.data.title,
            quizId: res.data.id,
          })
        );
      }

      setQuizData(quizData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Error fetching quiz");
      setLoading(false);
    }
  };

  const initializeQuiz = () => {
    const storedQuiz = JSON.parse(localStorage.getItem("quizId"));
    const storedUser = JSON.parse(localStorage.getItem("userData"));

    if (!storedUser) {
      setError("Silahkan login terlebih dahulu");
      return;
    }
    const { quizId } = storedQuiz || {};
    const { userId } = storedUser;

    if (quizId && userId) {
      const savedQuizData = JSON.parse(localStorage.getItem("currentQuiz"));

      if (savedQuizData) {
        const { currentIndex } = savedQuizData;
        setCurrentIndex(currentIndex);
        setResponse(quizId);
        fetchQuizData(quizId, userId, false);
      } else {
        fetchQuizData(quizId, userId);
      }
    }
  };

  useEffect(() => {
    initializeQuiz();
  }, [url, quizParams]);

  const handleNextQuestion = () => {
    if (quizData && currentIndex < quizData.length - 1) {
      const nextIndex = currentIndex + 1;

      const updatedData = JSON.parse(localStorage.getItem("currentQuiz"));
      updatedData.currentIndex = nextIndex;

      localStorage.setItem(
        "currentQuiz",
        JSON.stringify({
          ...updatedData,
          currentIndex: nextIndex,
        })
      );

      setCurrentIndex(nextIndex);
    } else {
      navigate("/result");
    }
  };

  const handleCountdownFinish = () => setShowCountdown(false);
  const handleOpenPopup = () => setIsOpen(true);
  const handleClosePopup = () => setIsOpen(false);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;
  if (showCountdown) return <Countdown onFinish={handleCountdownFinish} />;

  return (
    <div className="background-container">
      <div className="flex justify-end p-10">
        <ButtonSetting onClick={handleOpenPopup} />
        {isOpen && (
          <SettingPopup quizData={response} onClose={handleClosePopup} />
        )}
      </div>
      <div className="flex flex-col gap-4 p-10">
        <Question
          quiz={quizData[currentIndex]}
          onAnswer={handleNextQuestion}
          currentIndex={currentIndex}
          totalQuestions={quizData.length}
        />
      </div>
    </div>
  );
};

export default QuizPage;
