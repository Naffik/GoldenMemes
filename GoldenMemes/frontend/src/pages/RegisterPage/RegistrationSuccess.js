import React from "react";
import styles from "./RegistrationSuccess.module.scss";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Wrapper from "../../components/layoutContainers/Wrapper";
import CustomButton from "../../components/CustomButton";
import Header from "../../components/navigation/Header";
import { Link } from "react-router-dom";

function RegistrationSuccess() {
  return (
    <>
      <Header />
      <Wrapper>
        <div className={styles.container}>
          <BsFillCheckCircleFill size={108} color="#13D01B" />
          <h2>Sukces!</h2>
          <p>Zostałeś zarejestrowany! Teraz wróć do strony głównej i zaloguj się do serwisu</p>
          <Link className={styles.container_link} to="/">
            <CustomButton value="Przejdź do strony głównej" />
          </Link>
        </div>
      </Wrapper>
    </>
  );
}

export default RegistrationSuccess;
