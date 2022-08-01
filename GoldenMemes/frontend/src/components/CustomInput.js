import React from "react";
import styles from "./CustomInput.module.scss";

function CustomInput({ name, placeholder, value, onChange }) {
  return (
    <input
      className={styles.input}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e)}
      required
    />
  );
}

export default CustomInput;
