import React from "react";
import { Link } from "react-router-dom";

const Button = ({ styles, content, to, bgColor, hoverColor, type }) => {
  const buttonElement = (
    <button
      type={type}
      className={`button ${styles}`}
      style={{ backgroundColor: bgColor }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = bgColor)}
    >
      {content}
    </button>
  );

  return to ? <Link to={to}>{buttonElement}</Link> : buttonElement;
};

export default Button;
