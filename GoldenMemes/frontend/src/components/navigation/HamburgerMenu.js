import React from "react";
import styles from "./HamburgerMenu.module.scss";
import NavList from "./NavList";
import { useSelector } from "react-redux";

function HamburgerMenu({ visible }) {
  const isLoggedIn = useSelector((state) => state.accessToken);
  const username = useSelector((state) => state.user.name);

  if (!visible) return null;

  return (
    <>
      <div className={styles.container}>
        <NavList isUser={isLoggedIn} username={username} />
      </div>
    </>
  );
}

export default HamburgerMenu;
