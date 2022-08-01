import React from "react";
import styles from "./Registration.module.scss";
import { Link } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import SubpageContainer from "../../components/SubpageContainer";

function Login() {
  return (
    <SubpageContainer title="Zaloguj się" titleBody="Zaloguj się wpisując swoją nazwę użytkownika i hasło">
      <form>
        <CustomInput name="username" placeholder="nazwa użytkownika" value="" onChange={() => console.log("literka")} />
        <CustomInput
          name="password"
          placeholder="hasło"
          type="password"
          value=""
          onChange={() => console.log("literka")}
        />
        <CustomButton value="Zaloguj" />
        <span className={styles.loginReminder}>
          Nie masz konta?{"  "}
          <Link to="/register" className={styles.loginReminder_link}>
            Zarejestruj się
          </Link>
        </span>
      </form>
    </SubpageContainer>
  );
}

export default Login;
