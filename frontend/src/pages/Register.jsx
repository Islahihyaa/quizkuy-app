import React from "react";
import AuthCard from "../components/AuthCard";
import { Link } from "react-router-dom";
import { logo } from "../assets";

const Register = () => {
  return (
    <div>
      <div className="w-full flex justify-between items-center navbar fixed top-0 bg-purpleDark shadow-md z-50">
        <Link to={"/"}>
          <img
            src={logo}
            alt="logo"
            className="w-[176px] h-[64px] bg-white rounded-3xl p-1"
          />
        </Link>
      </div>
      <div className="flex justify-center items-center h-screen bg-purpleDark">
        <AuthCard type="register" />
      </div>
    </div>
  );
};

export default Register;
