import React from "react";
import styles from "./CustomButton.module.scss";

function CustomButton({ value }) {
  return <button className={styles.btn}>{value}</button>;
}

export default CustomButton;
