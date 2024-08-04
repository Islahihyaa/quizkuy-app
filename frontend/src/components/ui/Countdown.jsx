import React, { useEffect, useState } from "react";
import { countdownData } from "../../constants";
import styles from "../../style";

const Countdown = ({ onFinish }) => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (currentTime < countdownData.length - 1) {
      const timer = setTimeout(() => {
        setCurrentTime((prevIndex) => prevIndex + 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      if (onFinish) {
        onFinish();
      }
    }
  }, [currentTime, onFinish]);

  return (
    <div className="background-container">
      <div className={`${styles.flexCenter} p-10 min-h-screen`}>
        <div className={`${styles.flexCenter} bg-slate-900 w-full h-[300px] rounded-3xl` }>
          <h1 className="text-white text-8xl font-black">
            {countdownData[currentTime]?.title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
