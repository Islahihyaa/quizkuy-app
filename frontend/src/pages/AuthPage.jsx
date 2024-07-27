import React, { useContext, useState } from "react";
import { authData } from "../constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoWhite } from "../assets";
import Button from "../components/Button";
import { StoreContext } from "../contexts/StoreContext";
import axios from "axios";

const AuthPage = () => {
  const location = useLocation();
  const type = location.pathname === "/login" ? "login" : "register";
  const navigate = useNavigate();

  const { url } = useContext(StoreContext);

  const auth = authData.find((item) =>
    type === "login"
      ? item.title === "Masuk ke QuizKuy"
      : item.title === "Selamat datang di QuizKuy"
  );

  const [errorMessage, seterrorMessage] = useState("");

  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitAuth = async (e) => {
    e.preventDefault();

    if (
      type === "register" &&
      formData.password !== formData.passwordConfirmation
    ) {
      seterrorMessage("Password dan password konfirmasi harus sama");
      return;
    }

    let new_url = `${url}/user/${type}`;

    try {
      const response = await axios.post(new_url, formData);
      if ((response.status = 200)) {
        const userData = response.data.data;
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("token", response.data.data.token);
        navigate("/");
      } else {
        seterrorMessage(response.data.message);
      }
    } catch (error) {
      seterrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <div className="w-full flex justify-between items-center navbar fixed top-0 bg-purpleDark shadow-md z-50">
        <Link to={"/"}>
          <img src={logoWhite} alt="logo" className="navbar-img" />
        </Link>
      </div>
      <div className="flex justify-center items-center h-screen bg-purpleDark">
        <div className="card lg:card-side bg-base-100 shadow-xl auth-card">
          <figure className="border-r-2 md:w-1/2">
            <img src={auth.image} alt="auth image" className="p-6" />
          </figure>
          <div className="card-body md:w-1/2">
            <h2 className="card-title mb-2">{auth.title}</h2>
            {errorMessage && (
              <div className="badge badge-error gap-2 p-4 text-md">
                {errorMessage}
              </div>
            )}
            <form onSubmit={handleSubmitAuth}>
              {auth.input.map((input, index) => (
                <label key={index}>
                  {input.label}
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    name={input.name}
                    value={formData[input.name]}
                    onChange={handleChange}
                    className="input input-bordered w-full my-2"
                    required
                  />
                </label>
              ))}
              <div className="card-actions justify-end my-8">
                <Button
                  content={type === "login" ? "Masuk" : "Daftar"}
                  type="submit"
                  styles={`text-white`}
                  bgColor="#00A1FF"
                  hoverColor="#0295ea"
                />
              </div>
            </form>
            <div className="flex items-center my-8">
              <div className="text-md">{auth.links[0].text}</div>
              <Link
                to={auth.links[0].path}
                className="bg-purpleLight py-1 px-2 mx-2 rounded-md text-sm text-secondary"
              >
                {type === "login" ? "Daftar" : "Masuk"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
