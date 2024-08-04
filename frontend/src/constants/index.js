import { loginImage, registerImage } from "../assets";

export const navLinks = [
  {
    id: "beranda",
    title: "Beranda",
    path: "/",
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
        name: "email",
      },
      {
        label: "Password",
        placeholder: "password",
        type: "password",
        name: "password",
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
        name: "email",
      },
      {
        label: "Username",
        placeholder: "username",
        type: "text",
        name: "username",
      },
      {
        label: "Password",
        placeholder: "password",
        type: "password",
        name: "password",
      },
      {
        label: "Password Confirmation",
        placeholder: "Confirm Password",
        type: "password",
        name: "passwordConfirmation",
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

export const formQuizData = [
  {
    input: [
      {
        label: "Jumlah Soal",
        placeholder: "Jumlah soal",
        type: "number",
        name: "amount",
      },
      {
        label: "Kategori",
        placeholder: "Kategori",
        type: "select",
        name: "category",
      },
      {
        label: "Kesulitan",
        placeholder: "Kesulitan",
        type: "select",
        name: "difficulty",
        options: [
          { id: "easy", name: "Easy" },
          { id: "medium", name: "Medium" },
          { id: "hard", name: "Hard" },
        ],
      },
      {
        label: "Tipe",
        placeholder: "Tipe",
        type: "select",
        name: "type",
        options: [
          { id: "multiple", name: "Multiple Choise" },
          { id: "boolean", name: "True / False" },
        ],
      },
    ],
  },
];

export const countdownData = [
  {
    title: "3",
  },
  {
    title: "2",
  },
  {
    title: "1",
  },
  {
    title: "Mulai!",
  },
];

