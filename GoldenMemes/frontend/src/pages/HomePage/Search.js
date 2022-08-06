import React from "react";
import styles from "./Search.module.scss";

import { IoIosSearch } from "react-icons/io";
function Search() {
  return (
    <div className={styles.container}>
      <div className={styles.container__body}>
        <span>Szukaj</span> <IoIosSearch size={20} />
      </div>
    </div>
  );
}

export default Search;
