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
        type: "text",
        name: "category",
      },
      {
        label: "Kesulitan",
        placeholder: "Kesulitan",
        type: "text",
        name: "difficulty",
      },
      {
        label: "Tipe",
        placeholder: "Tipe",
        type: "text",
        name: "type",
      },
    ],
  },
];
