import React from "react";
import { Link } from "react-router-dom";
import styles from "./FormInfoText.module.scss";

function FormInfoText({ text, linkText, linkPath }) {
  return (
    <span className={styles.loginReminder}>
      {text} {"  "}
      <Link to={linkPath} className={styles.loginReminder_link}>
        {linkText}
      </Link>
    </span>
  );
}

export default FormInfoText;
