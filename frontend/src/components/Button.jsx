import React from "react";
import { Link } from "react-router-dom";

const Button = ({ styles, content, to }) => (
  <Link to={to}>
    <button
      type="button"
      className={`btn p-2 mx-2 font-poppins font-medium text-black rounded-[10px] ${styles}`}
    >
      {content}
    </button>
  </Link>
);

export default Button;
