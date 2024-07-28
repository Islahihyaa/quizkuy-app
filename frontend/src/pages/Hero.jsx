import React, { useContext, useState } from "react";
import Button from "../components/Button";
import { formQuizData } from "../constants";
import axios from "axios";
import { StoreContext } from "../contexts/StoreContext";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { url } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    difficulty: "",
    type: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/create-quiz`, formData);
      const params = response.data.data;
      console.log(params);
      navigate(
        `/quiz?amount=${params.amount}&category=${params.category}&difficulty=${params.difficulty}&type=${params.type}`
      );
    } catch (error) {
      console.error("Error fetching quiz:", error.message);
    }
  };

  return (
    <section className="flex justify-center w-full py-4">
      <div className="card card-side bg-base-100 shadow-xl w-full">
        <div className="card-body">
          <h2 className="card-title text-2xl">Masukkan Jenis Quiz</h2>
          <form onSubmit={handleSubmit}>
            {formQuizData[0].input.map((input, index) => (
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
                {input.name}
              </div>
            ))}
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
