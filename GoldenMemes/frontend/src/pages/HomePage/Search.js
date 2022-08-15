import React, { useState, useRef } from "react";
import styles from "./Search.module.scss";
import { IoIosSearch } from "react-icons/io";
import SearchModal from "./SearchModal";
import { slideSearch } from "../../animations/animations";

function Search() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const searchRef = useRef();
  const formRef = useRef();

  const handleSearchClick = () => {
    setSearchModalOpen(true);
  };

  const handleExitModal = () => {
    setSearchModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_body}>
        <div className={styles.container_body_searchBtn} onClick={handleSearchClick}>
          <span>Search</span>
          <IoIosSearch size={20} />
        </div>
        {searchModalOpen && <SearchModal searchRef={searchRef} formRef={formRef} exitModal={handleExitModal} />}
      </div>
    </div>
  );
}

export default Search;
