import React, { useState } from "react";
import styles from "./Header.module.scss";

import Wrapper from "./Wrapper";

import Logo from "./Logo";
import Nav from "./Nav";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import HamburgerMenu from "./HamburgerMenu";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <Wrapper>
        <div className={styles.header_wrapper}>
          <Logo />
          <Nav />

          {!menuOpen ? (
            <IoMdMenu
              className={styles.hamburgerMenuIcon}
              onClick={() => setMenuOpen(true)}
              size={28}
              color="#c5a880"
            />
          ) : (
            <IoMdClose
              className={styles.hamburgerMenuIcon}
              onClick={() => setMenuOpen(false)}
              size={28}
              color="#c5a880"
            />
          )}
          <HamburgerMenu visible={menuOpen} />
        </div>
      </Wrapper>
    </header>
  );
}

export default Header;
