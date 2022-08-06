import React from "react";
//import styles from "./Layout.module.scss";
import Wrapper from "./Wrapper";
import Nav from "./Nav";

function Layout(props) {
  return (
    <>
      <Nav />
      <Wrapper>{props.children}</Wrapper>
    </>
  );
}

export default Layout;
