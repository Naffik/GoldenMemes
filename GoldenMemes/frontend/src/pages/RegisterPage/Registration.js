import React, { useState } from "react";
import styles from "../RegisterPage/Registration.module.scss";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import CustomInput from "../../components/forms/CustomInput";
import SubpageContainer from "../../components/layoutContainers/SubpageContainer";
import CustomForm from "../../components/forms/CustomForm";
import SubmitButton from "../../components/forms/SubmitButton";
import FormInfoText from "../../components/forms/FormInfoText";
import { RegisterCall } from "../../api/apiCalls";
import ErrorMessage from "../../components/ErrorMessage";

const validationSchema = yup.object().shape({
  username: yup.string().required().label("Username"),
  email: yup.string().required().email().label("E-mail"),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .label("Password"),
  password2: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

function Registration() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const response = await RegisterCall(values);
    if (response) navigate("/register/success");
    else setError("Nieoczekiwany błąd spróbuj ponownie");
  };

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
          handleSubmit(values);
        }}
        validationSchema={validationSchema}
      >
        <form className={styles.form}>
          <CustomInput name="username" placeholder="nazwa użytkownika" type="text" />
          <CustomInput name="email" placeholder="e-mail" type="text" />
          <CustomInput name="password" placeholder="hasło" type="password" />
          <CustomInput name="password2" placeholder="powtórz hasło" type="password" />
          <SubmitButton value="Zarejestruj" />
          <FormInfoText text="Masz konto?" linkPath="/login" linkText="Zaloguj się" />
          {error && <ErrorMessage message={error} />}
        </form>
      </CustomForm>
    </SubpageContainer>
  );
}

export default Registration;
