import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authData } from "../../constants";
import Button from "../ui/Button";
import { StoreContext } from "../../contexts/StoreContext";
import { useAuth } from "../../hook/useAuth";

const Auth = () => {
  const { url } = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [errorMessage, seterrorMessage] = useState("");
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const type = location.pathname === "/login" ? "login" : "register";
  const auth = authData.find((item) =>
    item.title.includes(type === "login" ? "Masuk" : "Selamat")
  );

  const handleSubmitAuth = async (e) => {
    e.preventDefault();

    seterrorMessage("");
    setformData({
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    });

    const validationError = validateForm(type, formData);
    if (validationError) {
      seterrorMessage(validationError);
      return;
    }

    const authHandler = useAuth(type, url);
    try {
      await authHandler(formData);
      if (type === "register") {
        navigate("/login");
      } else {
        navigate("/");
      }
    } catch (error) {
      seterrorMessage(error.message);
    }
  };

  useEffect(() => {
    seterrorMessage("");
    setformData({
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      });
  }, [type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  return (
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
                // required
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
  );
};

const validateForm = (type, formData) => {
  if (type === "login") {
    if (!formData.email || !formData.password) {
      return "Email dan password harus diisi";
    }
  } else if (type === "register") {
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.passwordConfirmation
    ) {
      return "Data tidak boleh kosong";
    }
    if (formData.password !== formData.passwordConfirmation) {
      return "Konfirmasi password tidak sesuai";
    }
  }
  return null;
};

export default Auth;
