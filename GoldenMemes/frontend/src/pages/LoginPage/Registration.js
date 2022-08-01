import React from "react";
import styles from "./Registration.module.scss";

import { Link } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import SubpageContainer from "../../components/SubpageContainer";

function Registration() {
  return (
    <SubpageContainer
      title="Zarejestruj się"
      titleBody="Załóż konto i korzystaj z takich funkcji jak dodawanie memów, dodawanie do ulubionych, udział w konkursach
    i nie tylko!"
    >
      <form>
        <CustomInput name="username" placeholder="nazwa użytkownika" value="" onChange={() => console.log("literka")} />
        <CustomInput name="email" placeholder="e-mail" value="" onChange={() => console.log("literka")} />
        <CustomInput
          name="password"
          placeholder="hasło"
          type="password"
          value=""
          onChange={() => console.log("literka")}
        />
        <CustomInput
          name="password2"
          placeholder="powtórz hasło"
          type="password"
          value=""
          onChange={() => console.log("literka")}
        />
        <CustomButton value="Zarejestruj" />
        <span className={styles.loginReminder}>
          Masz konto?{"  "}
          <Link to="/login" className={styles.loginReminder_link}>
            Zaloguj się
          </Link>
        </span>
      </form>
    </SubpageContainer>
  );
}

export default Registration;
