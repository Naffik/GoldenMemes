import React, { useEffect } from "react";
import styles from "./Nav.module.scss";
import NavList from "./NavList";
import { useSelector } from "react-redux";

function Nav() {
  const isLoggedIn = useSelector((state) => state.accessToken);
  const username = useSelector((state) => state.user.name);

  return (
    <>
      <nav className={styles.container}>
        <NavList isUser={isLoggedIn} username={username} />
      </nav>
    </>
  );
}

export default Nav;
