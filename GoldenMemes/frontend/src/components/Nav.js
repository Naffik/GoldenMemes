import React from "react";
import styles from "./Nav.module.scss";
import Wrapper from "./Wrapper";
import ListItem from "./ListItem";

import { IoMdAdd, IoMdPerson, IoMdMenu } from "react-icons/io";

function Nav() {
  return (
    <header>
      <Wrapper>
        <div className={styles.header__wrapper}>
          <a href="/">
            <h1>Golden Memes</h1>
          </a>
          <nav>
            <ul>
              <ListItem text="Dodaj" icon={<IoMdAdd size={24} color="#c5a880" />} link="/add" />
              <ListItem text="Zaloguj" icon={<IoMdPerson size={24} color="#c5a880" />} link="/login" />
              <IoMdMenu className={styles.hamburgerMenu} size={28} color="#c5a880" />
            </ul>
          </nav>
        </div>
      </Wrapper>
    </header>
  );
}

export default Nav;
