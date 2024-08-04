import React, { useEffect, useState } from "react";
import { maskot } from "../../assets";
import { useNavigate } from "react-router-dom";
import styles from "../../style";

const Result = () => {
  const [username, setUsername] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("currentQuiz");
    const parsedData = storedData ? JSON.parse(storedData) : {};
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username);
    }

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

      setCorrectAnswers(correct);
      setWrongAnswers(wrong);
      setTotalQuestions(parsedData.quizData.length);
    }
  }, []);

  const handleBacktoHome = () => {
    localStorage.removeItem("currentQuiz");
    localStorage.removeItem("quizId");
    navigate("/");
  };

  const percentage = totalQuestions
    ? ((correctAnswers / totalQuestions) * 100).toFixed(2)
    : 0;

  return (
    <div className="background-container">
      <div className={`${styles.flexCenter} p-28`}>
        <div className="bg-[#1f0227] rounded-xl w-[600px] h-full">
          <div className={`${styles.flexCol} items-center px-6 py-8`}>
            <h1 className="font-semibold text-white text-lg font-poppins mb-6">
              Hasil Quiz
            </h1>
            <div className="bg-purpleCard rounded-xl w-full mb-4 flex p-2 items-center gap-4">
              <img
                src={maskot}
                alt="our maskot"
                className="w-[78px] h-[65px]"
              />
              <h1 className="text-white font-poppins font-semibold text-lg">
                {username}
              </h1>
            </div>
            <div className="bg-purpleCard rounded-xl w-full mb-4 flex flex-col px-6 py-4 gap-4">
              <h1 className="text-white font-bold">Nilai Saya</h1>
              <h1 className="text-white">{percentage}%</h1>
            </div>
            <div className="w-full">
              <h1 className="text-white text-center mt-10 mb-4 font-poppins font-semibold">
                Statistik Performa
              </h1>
              <div className="flex justify-between gap-3">
                <StatBox label="Benar" value={correctAnswers} />
                <StatBox label="Salah" value={wrongAnswers} />
                <StatBox label="Soal" value={totalQuestions} />
              </div>
            </div>
            <div className="bg-white w-full flex justify-center my-10 rounded-lg py-3">
              <button
                onClick={handleBacktoHome}
                className="text-black font-bold"
              >
                Temukan Quiz Baru
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ label, value }) => (
  <div className={`${styles.flexColCenter} bg-purpleCard rounded-md py-4 w-1/3 text-white`}>
    <span className="text-4xl font-bold mb-2">{value}</span> 
    {label}
  </div>
);

export default Result;
