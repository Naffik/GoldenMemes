import React from "react";
import Wrapper from "./Wrapper";
import styles from "./SubpageContainer.module.scss";
import Nav from "./Nav";

function SubpageContainer({ title, titleBody = "", ...props }) {
  return (
    <>
      <Nav />

      <div className={styles.container}>
        <Wrapper>
          <div className={styles.container_wrapper}>
            <div className={styles.container_wrapper_intro}>
              <h2>{title}</h2>
              <p>{titleBody}</p>
            </div>
            {props.children}
          </div>
        </Wrapper>
      </div>
    </>
  );
}

export default SubpageContainer;
