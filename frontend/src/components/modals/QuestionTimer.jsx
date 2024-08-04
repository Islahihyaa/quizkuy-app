import React, { useEffect, useState } from "react";

const QuestionTimer = ({ duration, onTimeUp, currentIndex }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setTimeout(() => {
            onTimeUp();
          }, 0);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, onTimeUp, currentIndex]);

  const timePercentage = (timeLeft / duration) * 100;

  return (
    <div className="relative w-full max-w-xs mx-auto">
      <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
        <div
          className={`h-full ${
            timePercentage > 50
              ? "bg-green-500"
              : timePercentage > 20
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
          style={{ width: `${timePercentage}%` }}
        ></div>
      </div>
      <div className="text-white text-center mt-2">
        Time Left: <span className="font-bold">{timeLeft}s</span>
      </div>
    </div>
  );
};

export default QuestionTimer;
