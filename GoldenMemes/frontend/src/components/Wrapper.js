import React from "react";
import styles from "./Wrapper.module.scss";

function Wrapper({ children, wrapperRef = null }) {
  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {children}
    </div>
  );
}

export default Wrapper;
