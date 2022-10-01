import React from "react";
import styles from "./ErrorMessage.module.scss";

function ErrorMessage({ message, styling = null }) {
  return <p className={`${styles.error} ${styling && styling.map((style) => styles[style])}`}>{message}</p>;
}

export default ErrorMessage;
