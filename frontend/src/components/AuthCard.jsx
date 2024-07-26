import React from "react";
import { authData } from "../constants";
import { Link } from "react-router-dom";

const AuthCard = ({ type }) => {
  const auth = authData.find((item) =>
    type === "login"
      ? item.title === "Masuk ke QuizKuy"
      : item.title === "Selamat datang di QuizKuy"  
  );
  
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl auth-card">
      <figure className="border-r-2 w-1/2">
        <img src={auth.image} alt="auth image" className="p-6" />
      </figure>
      <div className="card-body w-1/2">
        <h2 className="card-title mb-2">{auth.title}</h2>
        <form action="">
          {auth.input.map((input, index) => (
            <label key={index}>
              {input.label}
              <input
                type={input.type}
                placeholder={input.placeholder}
                className="input input-bordered w-full my-2"
              />
            </label>
          ))}
          <div className="card-actions justify-end my-8">
            <button type="submit" className="button">
              {type === "login" ? "Masuk" : "Daftar"}
            </button>
          </div>
          <div className="flex items-center my-8">
            <div className="text-md">{auth.links[0].text}</div>
            <Link
              to={auth.links[0].path}
              className="bg-purpleLight py-1 px-2 mx-2 rounded-md text-sm text-secondary"
            >
              {type === "login" ? "Daftar" : "Masuk"}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthCard;  
