import React from "react";
import CustomInput from "../../components/CustomInput";
import SubpageContainer from "../../components/SubpageContainer";
import SubmitButton from "../../components/SubmitButton";
import CustomForm from "../../components/CustomForm";
import FormInfoText from "../../components/FormInfoText";

function Login() {
  return (
    <SubpageContainer title="Zaloguj się" titleBody="Zaloguj się wpisując swoją nazwę użytkownika i hasło">
      <CustomForm
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        <form>
          <CustomInput name="username" placeholder="nazwa użytkownika" type="text" />
          <CustomInput name="password" placeholder="hasło" type="password" />
          <SubmitButton value="Zaloguj" />
          <FormInfoText text="Nie masz konta?" linkPath="/register" linkText="Zarejestruj się" />
        </form>
      </CustomForm>
    </SubpageContainer>
  );
}

export default Login;
