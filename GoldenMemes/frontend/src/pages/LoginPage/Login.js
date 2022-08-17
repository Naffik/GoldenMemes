import React, { useState } from "react";
import styles from "../RegisterPage/Registration.module.scss";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import CustomInput from "../../components/forms/CustomInput";
import SubpageContainer from "../../components/layoutContainers/SubpageContainer";
import SubmitButton from "../../components/forms/SubmitButton";
import CustomForm from "../../components/forms/CustomForm";
import FormInfoText from "../../components/forms/FormInfoText";
import { LoginCall } from "../../api/apiCalls";
import ErrorMessage from "../../components/ErrorMessage";

const validationSchema = yup.object().shape({
  username: yup.string().required().label("Username"),
  password: yup.string().required().label("Password"),
});

function Login() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const response = await LoginCall(values);
    if (response) navigate("/");
    else setError(true);
  };

  return (
    <SubpageContainer title="Zaloguj się" titleBody="Zaloguj się wpisując swoją nazwę użytkownika i hasło">
      <CustomForm
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        validationSchema={validationSchema}
      >
        <form className={styles.form}>
          <CustomInput name="username" placeholder="nazwa użytkownika" type="text" />
          <CustomInput name="password" placeholder="hasło" type="password" />
          <SubmitButton value="Zaloguj" />
          {error && <ErrorMessage message="Dane logowania nie zgadzają się" />}
          <FormInfoText text="Nie masz konta?" linkPath="/register" linkText="Zarejestruj się" />
        </form>
      </CustomForm>
    </SubpageContainer>
  );
}

export default Login;
