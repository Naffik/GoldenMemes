import React from "react";
import { Link } from "react-router-dom";

import styles from "./ListItem.module.scss";

function ListItem({ icon, text, link }) {
  // console.log("link", link);
  return (
    <Link to={link} className={styles.link}>
      <li>{text}</li>
      {icon}
    </Link>
  );
}

export default ListItem;
