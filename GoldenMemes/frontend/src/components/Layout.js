import React from "react";
//import styles from "./Layout.module.scss";
import Wrapper from "./Wrapper";
import Header from "./Header";

function Layout(props) {
  return (
    <>
      <Header />
      <Wrapper>{props.children}</Wrapper>
    </>
  );
}

export default Layout;
