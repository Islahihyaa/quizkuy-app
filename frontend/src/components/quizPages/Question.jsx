import React, { useEffect, useState } from "react";
import QuestionTimer from "../modals/QuestionTimer";
import styles from "../../style";

const Question = ({ quiz, onAnswer, currentIndex, totalQuestions }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  useEffect(() => {
    const storedData = localStorage.getItem("currentQuiz");
    const parsedData = storedData ? JSON.parse(storedData) : {};

    if (parsedData.quizData) {
      let correct = 0;
      let wrong = 0;

      parsedData.quizData.forEach((item) => {
        if (item.selectedAnswer === item.correctAnswer) {
          correct += 1;
        } else if (item.selectedAnswer || null) {
          wrong += 1;
        }
      });

      setCorrectCount(correct);
      setWrongCount(wrong);
    }

    if (parsedData.quizData && parsedData.quizData[currentIndex]) {
      setSelectedAnswer(
        parsedData.quizData[currentIndex].selectedAnswer || null
      );
    }
  }, [quiz, currentIndex]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);

    const storedData = localStorage.getItem("currentQuiz");
    const parsedData = storedData ? JSON.parse(storedData) : {};
    const { currentIndex } = parsedData;

    if (!parsedData.quizData) {
      parsedData.quizData = [];
    }

    const questionData = {
      question: quiz.question,
      correctAnswer: quiz.correct_answer,
      selectedAnswer: answer,
    };

    parsedData.quizData[currentIndex] = questionData;
    localStorage.setItem("currentQuiz", JSON.stringify(parsedData));

    if (answer === quiz.correct_answer) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setWrongCount((prev) => prev + 1);
    }

    onAnswer();

    setTimeout(() => {
      setClickedAnswer(null);
    }, 300);
  };

  const handleTimeUp = () => {
    handleAnswer("Y0uR 4N5vv3R i5 VVr0Ng");
  };

  const incorrectAnswers = Array.isArray(quiz.incorrect_answers)
    ? quiz.incorrect_answers
    : [];
  const allAnswers = [...incorrectAnswers, quiz.correct_answer];
  const shuffleAnswers = allAnswers.sort(() => Math.random() - 0.5);

  return (
    <>
      <div className="bg-slate-900 h-[300px] rounded-xl flex flex-col p-10">
        <div className="text-white">
          {currentIndex + 1}/{totalQuestions}
        </div>
        <h1 className="text-white mb-4">{quiz.category} </h1>
        <h1 className="text-white text-3xl">{quiz.question} </h1>
      </div>
      <div className="flex gap-2 justify-between text-white">
        <ul className="answers-list flex gap-2 justify-between w-full">
          {shuffleAnswers.map((answer, index) => (
            <li key={index} className={`${styles.flexCenter} `}>
              <button
                onClick={() => handleAnswer(answer)}
                className="bg-slate-900 rounded-xl w-[250px] h-[200px] p-2"
              >
                <h1 className="text-2xl">{answer}</h1>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-4 mt-4">
        <div className="score-display">Benar: {correctCount}</div>
        <div className="score-display">Salah: {wrongCount}</div>
      </div>
      <div>
        <QuestionTimer
          duration={15}
          onTimeUp={handleTimeUp}
          currentIndex={currentIndex}
        />
      </div>
    </>
  );
};

export default Question;
