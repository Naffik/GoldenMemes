import React from "react";
import "./Registration.module.scss";
import * as yup from "yup";

import CustomInput from "../../components/CustomInput";
import SubpageContainer from "../../components/SubpageContainer";
import CustomForm from "../../components/CustomForm";
import SubmitButton from "../../components/SubmitButton";
import FormInfoText from "../../components/FormInfoText";

const validationSchema = yup.object().shape({
  username: yup.string().required().label("Username"),
  email: yup.string().required().email().label("Username"),
  password: yup.string().required().min(4).label("Password"),
  passwordRepeat: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

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
          passwordRepeat: "",
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
        validationSchema={validationSchema}
      >
        <form>
          <CustomInput name="username" placeholder="nazwa użytkownika" type="text" />
          <CustomInput name="email" placeholder="e-mail" type="text" />
          <CustomInput name="password" placeholder="hasło" type="password" />
          <CustomInput name="passwordRepeat" placeholder="powtórz hasło" type="password" />
          <SubmitButton value="Zarejestruj" />
          <FormInfoText text="Masz konto?" linkPath="/login" linkText="Zaloguj się" />
        </form>
      </CustomForm>
    </SubpageContainer>
  );
}

export default Registration;
