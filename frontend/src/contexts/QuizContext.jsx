import React, { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizParams, setQuizParams] = useState(null);

  return (
    <QuizContext.Provider value={{ quizParams, setQuizParams }}>
      {children}
    </QuizContext.Provider>
  );
};
