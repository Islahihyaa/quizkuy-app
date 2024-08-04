import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Hero from "./pages/Hero.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import Result from "./components/quizPages/Result.jsx";
import { QuizProvider } from "./contexts/QuizContext.jsx";
import StoreContextProvider from "./contexts/StoreContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Hero />,
      },
    ],
  },
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/register",
    element: <AuthPage />,
  },
  {
    path: "/quiz",
    element: <QuizPage />,
  },
  {
    path: "/result",
    element: <Result />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreContextProvider>
    <QuizProvider>
      <RouterProvider router={router} />
    </QuizProvider>
  </StoreContextProvider>
);
