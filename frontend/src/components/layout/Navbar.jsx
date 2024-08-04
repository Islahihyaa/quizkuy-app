import React, { useEffect, useState } from "react";
import { logo } from "../../assets";
import { navLinks } from "../../constants";
import Button from "../ui/Button";
import styles from "../../style";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("Beranda");
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setisLoggedIn(false);
    setUsername("");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("userData");
    setisLoggedIn(!!token);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username);
    }
  }, []);

  return (
    <nav className={`${styles.flexBetween} w-full navbar fixed top-0 bg-white shadow-md z-50 px-6`}>
      <div className={`${styles.flexCenter}`}>
        <Link to={"/"}>
          <img src={logo} alt="logo" className="navbar-img" />
        </Link>
        <ul className="flex items-center justify-end mx-6">
          {navLinks.map((nav, index) => (
            <li
              key={nav.id}
              className={`font-poppins font-medium cursor-pointer text-[16px] ${
                active === nav.title ? "active" : "text-black"
              } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
              onClick={() => setActive(nav.title)}
            >
              <Link to={nav.path}>{nav.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-3">
        {!isLoggedIn ? (
          <>
            <Button
              content="Masuk"
              styles={`text-white`}
              to="/login"
              bgColor="#00A1FF"
              hoverColor="#0295ea"
            />
            <Button
              content="Daftar"
              styles={`text-black`}
              to="/register"
              bgColor="#D3D3D3"
              hoverColor="#bfbfbf"
            />
          </>
        ) : (
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <div tabIndex="0" role="button" className="btn btn-ghost">
                <p>{username}</p>
              </div>
              <ul
                tabIndex="0"
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
