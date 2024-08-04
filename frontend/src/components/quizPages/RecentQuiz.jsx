import React from "react";
import { imageRecentQuiz } from "../../assets";
import styles from "../../style";

const RecentQuiz = () => {
  const storedQuiz = localStorage.getItem("currentQuiz");
  const quiz = JSON.parse(storedQuiz);

  const handleNavigate = () => {
    window.location.href = `/quiz`;
  };

  return (
    <div className="shadow-xl rounded-xl">
      <button onClick={handleNavigate}>
        <div
          className={`${styles.flexColCenter} bg-base-600 border-2 rounded-xl w-56 h-60`}
        >
          <img
            src={imageRecentQuiz}
            alt="Random"
            className="object-cover rounded-t-xl shadow-md"
          />
          <div className="p-4">
            <h2 className="text-lg text-center font-bold">{quiz.title}</h2>
          </div>
        </div>
      </button>
    </div>
  );
};

export default RecentQuiz;
