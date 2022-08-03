import React from "react";
import styles from "./CustomButton.module.scss";

function CustomButton({ value, ...otherProps }) {
  return (
    <button className={styles.btn} {...otherProps}>
      {value}
    </button>
  );
}

export default CustomButton;
