import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import { prisma } from "../utils/prismaClient.js";
import { ValidationError } from "../utils/error.js";

const createToken = (user_id, expiresIn = "10h") => {
  return jwt.sign({ user_id }, process.env.JWT_SECRET, { expiresIn });
};

export async function register(req, res) {
  const { username, email, password, passwordConfirmation } = req.body;
  const emailExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (emailExist) throw new ValidationError("Email sudah digunakan", 400);

  if (password !== passwordConfirmation) {
    throw new ValidationError(
      "Password dan password konfirmasi harus sama",
      400
    );
  }

  if (!validator.isEmail(email))
    throw new ValidationError("Masukkan email yang valid", 400);

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  res.sendStatus(200);
}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new ValidationError("User tidak ditemukan", 400);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ValidationError("Email atau password salah", 400);

  const token = createToken(user.user_id);

  res.status(200).json({
    success: true,
    data: {
      userId: user.user_id,
      username: user.username,
      token,
    },
  });
}
