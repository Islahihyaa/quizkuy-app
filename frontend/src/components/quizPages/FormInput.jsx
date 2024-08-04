import React, { useContext, useState } from "react";
import axios from "axios";
import Button from "../ui/Button";
import { formQuizData } from "../../constants";
import { StoreContext } from "../../contexts/StoreContext";
import { useNavigate } from "react-router-dom";
import useAxios from "../../contexts/UseAxios";
import { QuizContext } from "../../contexts/QuizContext";
import SelectField from "../modals/SelectCategory";
import LoadingSpinner from "../ui/LoadingSpinner";

const FormInput = () => {
  const { response, error, loading } = useAxios({ url: "/api_category.php" });
  const { url } = useContext(StoreContext);
  const { setQuizParams } = useContext(QuizContext);
  const navigate = useNavigate();

  const [errorMessage, seterrorMessage] = useState("");
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    difficulty: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    removeRecentQuiz()

    const user = getUserData();
    if (!user) return;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const { amount, category, difficulty, type } = formData;
    if (!amount || !category || !difficulty || !type) {
      seterrorMessage("Data tidak boleh kosong");
      return;
    }

    try {
      const { data } = await axios.post(`${url}/api/create-quiz`, {
        ...formData,
        userId: user.userId,
        encode: "url3986",
      });

      setQuizParams(data.data);
      localStorage.setItem("quizId", JSON.stringify(data.data));
      navigate("/quiz");
    } catch (error) {
      seterrorMessage(error.response?.data?.message || "Unknown error");
    }
  };

  const clearError = () => {
    seterrorMessage("");
  };

  const removeRecentQuiz = () => {
    localStorage.removeItem("currentQuiz");
    localStorage.removeItem("quizId");
  };

  const getUserData = () => {
    const storedUser = localStorage.getItem("userData");
    if (!storedUser) {
      seterrorMessage("Silahkan login terlebih dahulu");
      navigate('/login');
      return null;
    }
    return JSON.parse(storedUser);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error fetching categories</p>;

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && (
        <div className="badge badge-error gap-2 p-4 text-md">
          {errorMessage}
        </div>
      )}
      {formQuizData[0].input.map((input, index) => {
        if (input.type === "select") {
          const options =
            input.name === "category"
              ? response.trivia_categories
              : input.options;
          return (
            <div key={index} className="my-2 w-full">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                {input.label}
              </label>
              <SelectField
                name={input.name}
                value={formData[input.name]}
                handleChange={handleChange}
                options={options}
              />
            </div>
          );
        } else {
          return (
            <div key={index} className="my-2 w-full">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                {input.label}
              </label>
              <input
                type={input.type}
                placeholder={input.placeholder}
                name={input.name}
                value={formData[input.name]}
                onChange={handleChange}
                className="input input-bordered input-info w-full"
              />
            </div>
          );
        }
      })}
      <div className="card-actions justify-center">
        <Button
          content="Kirim"
          type="submit"
          styles="text-white"
          bgColor="#00A1FF"
          hoverColor="#0295ea"
        />
      </div>
    </form>
  );
};

export default React.memo(FormInput);
