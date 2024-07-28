import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Activity from "./pages/Activity.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import StoreContextProvider from "./contexts/StoreContext.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import Hero from "./pages/Hero.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/quiz",
        element: <QuizPage />,
      },
      {
        path: "/activity",
        element: <Activity />,
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreContextProvider>
      <RouterProvider router={router} />
    </StoreContextProvider>
  </React.StrictMode>
);
