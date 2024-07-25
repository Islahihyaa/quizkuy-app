import React, { useState } from "react";
import { logo } from "../assets";
import { navLinks } from "../constants";
import Button from "./Button";
import styles from "../style";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggleLogin, settoggleLogin] = useState(false);
  return (
    <nav className="w-full flex justify-between items-center navbar fixed top-0 bg-white shadow-md z-50">
      <div className={`${styles.flexCenter}`}>
        <Link to={"/"}>
          <img src={logo} alt="logo" className="w-[176px] h-[64px]" />
        </Link>
        <ul className="flex items-center justify-end mx-6">
          {navLinks.map((nav, index) => (
            <li
              key={nav.id}
              className={`font-poppins font-medium cursor-pointer text-[16px] ${
                active === nav.title ? "text-black" : "text-black"
              } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`${nav.path}`}>{nav.title}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex">
        <Button content="Masuk" styles={`bg-primary`} to="/login" />
        <Button content="Daftar" styles={` `} to="/register" />
      </div>
    </nav>
  );
};

export default Navbar;
