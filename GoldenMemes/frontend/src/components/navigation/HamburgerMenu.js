import React from "react";
import styles from "./HamburgerMenu.module.scss";
import NavList from "./NavList";

function HamburgerMenu({ visible }) {
  if (!visible) return null;

  return (
    <>
      <div className={styles.container}>
        <NavList />
      </div>
    </>
  );
}

export default HamburgerMenu;
