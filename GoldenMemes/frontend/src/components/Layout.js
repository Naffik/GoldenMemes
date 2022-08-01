import React from "react";
import styles from "./Layout.module.scss";
import Wrapper from "./Wrapper";
import Nav from "./Nav";

function Layout(props) {
  return (
    <>
      <Nav />
      <div className={styles.container}>
        <Wrapper>{props.children}</Wrapper>
      </div>
    </>
  );
}

export default Layout;
