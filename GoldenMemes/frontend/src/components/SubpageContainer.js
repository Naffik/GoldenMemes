import React from "react";
import Wrapper from "./Wrapper";
import styles from "./SubpageContainer.module.scss";

function SubpageContainer({ title, titleBody = "", ...props }) {
  return (
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
  );
}

export default SubpageContainer;
