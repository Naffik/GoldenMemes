import React from "react";
import styles from "./HamburgerMenu.module.scss";
import NavList from "./NavList";

function HamburgerMenu({ visible }) {
  return (
    <>
      {visible ? (
        <div className={styles.container}>
          <NavList mobileNav={true} />
        </div>
      ) : null}
    </>
  );
}

export default HamburgerMenu;
