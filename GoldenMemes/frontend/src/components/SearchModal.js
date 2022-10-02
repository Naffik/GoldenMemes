import React from "react";
import styles from "./SearchModal.module.scss";
import CustomInput from "./forms/CustomInput";
import CustomForm from "./forms/CustomForm";
import SubmitButton from "./forms/SubmitButton";
import Wrapper from "./layoutContainers/Wrapper";
import { IoIosSearch, IoIosClose } from "react-icons/io";

function SearchModal({ exitModal, searchRef, formRef }) {
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
