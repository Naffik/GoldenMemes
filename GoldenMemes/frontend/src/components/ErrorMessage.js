import React from "react";
import styles from "./ErrorMessage.module.scss";

function ErrorMessage({ message }) {
  return <span className={styles.error}>{message}</span>;
}

export default ErrorMessage;
