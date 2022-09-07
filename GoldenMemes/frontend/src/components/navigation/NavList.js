import React from "react";
import styles from "./NavList.module.scss";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

import NavListItem from "./NavListItem";
import { ReactComponent as Separator } from "../../assets/svg/navlink-separator.svg";
import CustomButton from "../CustomButton";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../store/auth";

function NavList({ isUser, username }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLoggedOut());
  };

  return (
    <ul className={styles.list}>
      <Link to="/add">
        <CustomButton value="Dodaj mema" icon={<IoMdAdd size={24} color="#c5a880" />} />
      </Link>
      {isUser ? (
        <div className={styles.list_login}>
          <NavListItem text={username} link="/login" icon={<FaUserAlt color="#c5a880" />} />
          <MdLogout className={styles.list_login_logoutIcon} color="#c5a880" size={20} onClick={handleLogout} />
        </div>
      ) : (
        <div className={styles.list_login}>
          <NavListItem text="Zaloguj" link="/login" />
          <Separator />
          <NavListItem text="Zarejestruj" link="/register" />
        </div>
      )}
    </ul>
  );
}

export default NavList;
