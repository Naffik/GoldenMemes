import React, { useEffect, useRef } from "react";
import styles from "./SearchModal.module.scss";
import CustomInput from "../../components/CustomInput";
import CustomForm from "../../components/CustomForm";
import SubmitButton from "../../components/SubmitButton";
import Wrapper from "../../components/Wrapper";
import { IoIosSearch, IoIosClose } from "react-icons/io";
import { slideSearch } from "../../animations/animations";

function SearchModal({ exitModal, searchRef, formRef }) {
  useEffect(() => {
    console.log(searchRef.current);
    slideSearch(searchRef.current, formRef.current);
  }, []);

  return (
    <div ref={searchRef} className={styles.container}>
      <Wrapper>
        <div ref={formRef}>
          <div className={styles.container_exit} onClick={exitModal}>
            <span>Exit search panel</span>
            <IoIosClose className={styles.container_exit_icon} />
          </div>
          <CustomForm
            initialValues={{ search: "" }}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
            }}
          >
            <form className={styles.container_form}>
              <CustomInput name="search" placeholder="szukaj..." styling="secondary" />
              <SubmitButton icon={<IoIosSearch size={20} />} />
            </form>
          </CustomForm>
        </div>
      </Wrapper>
    </div>
  );
}

export default SearchModal;
