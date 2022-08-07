import React from "react";
import styles from "./NavList.module.scss";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";

import NavListItem from "./NavListItem";
import { ReactComponent as Separator } from "../assets/svg/navlink-separator.svg";
import CustomButton from "./CustomButton";

function NavList() {
  return (
    <ul className={styles.list}>
      <Link to="/add">
        <CustomButton value="Dodaj mema" icon={<IoMdAdd size={23} color="#c5a880" />} />
      </Link>
      <div className={styles.list_login}>
        <NavListItem text="Zaloguj" link="/login" />
        <Separator />
        <NavListItem text="Zarejestruj" link="/register" />
      </div>
    </ul>
  );
}

export default NavList;
