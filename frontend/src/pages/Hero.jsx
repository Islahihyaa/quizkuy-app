import React, { useEffect, useState } from "react";
import FormInput from "../components/quizPages/FormInput";
import RecentQuiz from "../components/quizPages/RecentQuiz";
import styles from "../style";

const Hero = () => {
  const [quizExist, setQuizExist] = useState(false);

  useEffect(() => {
    setQuizExist(!!localStorage.getItem("currentQuiz"));
  }, []);

  return (
    <section className={`${styles.flexCol} w-full py-4 px-10 gap-8`}>
      <div className="card card-side bg-base-100 shadow-xl w-full">
        <div className="card-body box-shadow">
          <h2 className="card-title text-2xl">Masukkan Jenis Quiz</h2>
          <FormInput />
        </div>
      </div>
      {quizExist && (
        <div className="flex justify-start">
          <div className="flex flex-col">
            <h1 className="card-title mb-6">Aktivitas Terbaru</h1>
            <RecentQuiz />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
