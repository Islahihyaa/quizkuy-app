import { ValidationError } from "../utils/error.js";

export const authMiddleware = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }
  return res
    .status(500)
    .json({ success: false, message: "Internal Server Error" });
};
