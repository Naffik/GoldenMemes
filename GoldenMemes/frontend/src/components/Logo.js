import React from "react";
import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link className={styles.logo} to="/">
      <h1>Golden Memes</h1>
    </Link>
  );
}

export default Logo;
