import React from "react";
import "./Registration.module.scss";

import CustomInput from "../../components/CustomInput";
import SubpageContainer from "../../components/SubpageContainer";
import CustomForm from "../../components/CustomForm";
import SubmitButton from "../../components/SubmitButton";
import FormInfoText from "../../components/FormInfoText";

function Registration() {
  return (
    <SubpageContainer
      title="Zarejestruj się"
      titleBody="Załóż konto i korzystaj z takich funkcji jak dodawanie memów, dodawanie do ulubionych, udział w konkursach
    i nie tylko!"
    >
      <CustomForm
        initialValues={{
          username: "",
          email: "",
          password: "",
          password2: "",
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <form>
          <CustomInput name="username" placeholder="nazwa użytkownika" type="text" />
          <CustomInput name="email" placeholder="e-mail" type="text" />
          <CustomInput name="password" placeholder="hasło" type="password" />
          <CustomInput name="password2" placeholder="powtórz hasło" type="password" />
          <SubmitButton value="Zarejestruj" />
          <FormInfoText text="Masz konto?" linkPath="/login" linkText="Zaloguj się" />
        </form>
      </CustomForm>
    </SubpageContainer>
  );
}

export default Registration;
