import React from "react";
import styles from "./Tile.module.scss";

function Tile({ active = false, icon, text, ...otherProps }) {
  return (
    <div className={`${styles.container} ${active && styles.container__active}`} {...otherProps}>
      <span className={styles.container_icon}>{icon}</span> <span>{text}</span>
    </div>
  );
}

export default Tile;
