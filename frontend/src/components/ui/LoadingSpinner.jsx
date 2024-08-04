import React from "react";
import styles from "../../style";

const LoadingSpinner = () => {
  return (
    <div className={`${styles.flexCenter}`}>
      <span className="loading loading-dots loading-lg"></span>
    </div>
  );
};

export default LoadingSpinner;
