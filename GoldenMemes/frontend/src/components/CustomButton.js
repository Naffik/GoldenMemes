import React from "react";
import styles from "./CustomButton.module.scss";

function CustomButton({ icon = null, value, ...otherProps }) {
  return (
    <button className={styles.btn} {...otherProps}>
      {icon}
      {value}
    </button>
  );
}

export default CustomButton;
