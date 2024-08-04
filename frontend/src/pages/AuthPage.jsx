import React from "react";
import { Link } from "react-router-dom";
import { logoWhite } from "../assets";
import Auth from "../components/auth/Auth";
import styles from "../style";

const AuthPage = () => {
  return (
    <>
      <div
        className={`${styles.flexBetween} navbar w-full fixed top-0 bg-purpleDark shadow-md z-50`}
      >
        <Link to={"/"}>
          <img src={logoWhite} alt="logo" className="navbar-img" />
        </Link>
      </div>
      <div className={`${styles.flexCenter} h-screen bg-purpleDark`}>
        <Auth />
      </div>
    </>
  );
};

export default AuthPage;
