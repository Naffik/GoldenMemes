import React from "react";
import { Link } from "react-router-dom";

import styles from "./NavListItem.module.scss";

function NavListItem({ icon = null, text, link }) {
  return (
    <Link to={link} className={styles.link}>
      {icon}
      <li>{text}</li>
    </Link>
  );
}

export default NavListItem;
