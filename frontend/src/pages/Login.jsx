import React from "react";
import AuthCard from "../components/AuthCard";
import { Link } from "react-router-dom";
import { logoWhite } from "../assets";

const Login = () => {
  return (
    <>
      <div className="w-full flex justify-between items-center navbar fixed top-0 bg-purpleDark shadow-md z-50">
        <Link to={"/"}>
          <img src={logoWhite} alt="logo" className="navbar-img" />
        </Link>
      </div>
      <div className="flex justify-center items-center h-screen bg-purpleDark">
        <AuthCard type="login" />
      </div>
    </>
  );
};

export default Login;
