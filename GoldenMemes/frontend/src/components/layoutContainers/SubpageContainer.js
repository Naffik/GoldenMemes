import React from "react";
import Wrapper from "./Wrapper";
import styles from "./SubpageContainer.module.scss";
import Header from "../navigation/Header";

function SubpageContainer({ title, titleBody = "", ...props }) {
  return (
    <>
      <Header />

      <div className={styles.container}>
        <Wrapper>
          <div className={styles.container_wrapper}>
            <div className={styles.container_wrapper_intro}>
              <h2>{title}</h2>
              <p className={styles.container_wrapper_intro_title}>{titleBody}</p>
            </div>
            <div className={styles.container_wrapper_content}>{props.children}</div>
          </div>
        </Wrapper>
      </div>
    </>
  );
}

export default SubpageContainer;
