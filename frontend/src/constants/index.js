import { loginImage, registerImage } from "../assets";

export const navLinks = [
  {
    id: "beranda",
    title: "Beranda",
    path: "/",
  },
  {
    id: "aktivitas",
    title: "Aktivitas",
    path: "/activity",
  },
];

export const authData = [
  {
    image: loginImage,
    title: "Masuk ke QuizKuy",
    input: [
      {
        label: "Email",
        placeholder: "email",
        type: "email",
      },
      {
        label: "Password",
        placeholder: "password",
        type: "password",
      },
    ],
    links: [
      {
        text: "Apa kamu belum memiliki akun?",
        path: "/register",
      },
    ],
  },
  {
    image: registerImage,
    title: "Selamat datang di QuizKuy",
    input: [
      {
        label: "Email",
        placeholder: "email",
        type: "email",
      },
      {
        label: "Username",
        placeholder: "username",
        type: "text",
      },
      {
        label: "Password",
        placeholder: "password",
        type: "password",
      },
    ],
    links: [
      {
        text: "Sudah punya akun?",
        path: "/login",
      },
    ],
  },
];
