import React, { useEffect, useState } from "react";
import { maskot } from "../../assets";
import styles from "../../style";

const SettingPopup = ({ quizData, onClose }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserData = () => {
      const storedUser = localStorage.getItem("userData");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUsername(user.username);
      }
    };

    fetchUserData();
  }, [quizData]);

  return (
    <div className={`${styles.flexCenter} fixed inset-0 bg-black bg-opacity-50 z-50`}>
      <div className="bg-secondary p-8 rounded-xl shadow-lg relative">
        <h1 className="text-3xl font-bold mb-6">Pengaturan</h1>
        
        <UserInfoSection username={username} maskot={maskot} />

        <ActionButtons onClose={onClose} />
      </div>
    </div>
  );
};

const UserInfoSection = ({ username, maskot }) => (
  <div className="bg-slate-500 rounded-lg px-1 py-2 mb-4">
    <div className="flex justify-start items-center text-white text-xl">
      <img src={maskot} alt="Mascot" className="w-[78px] h-[65px]" />
      <div className="flex flex-col font-poppins font-semibold text-lg ml-4">
        <span>Hello</span>
        <span>{username}</span>
      </div>
    </div>
  </div>
);

const ActionButtons = ({ onClose }) => (
  <div className="flex justify-between gap-2">
    <button
      className="bg-slate-700 p-4 rounded-lg text-white text-lg"
      onClick={onClose}
    >
      Lanjutkan
    </button>
    <button
      className="bg-slate-700 p-4 rounded-lg text-white text-lg"
      onClick={() => window.location.href = "/"}
    >
      Kembali ke beranda
    </button>
  </div>
);

export default SettingPopup;
