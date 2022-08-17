import React from "react";
import styles from "./Nav.module.scss";
import NavList from "./NavList";

function Nav() {
  return (
    <>
      <nav className={styles.container}>
        <NavList />
      </nav>
    </>
  );
}

export default Nav;
