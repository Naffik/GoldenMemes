import React from "react";
import styles from "./AddPost.module.scss";
import * as yup from "yup";

import SubpageContainer from "../../components/SubpageContainer";
import CustomForm from "../../components/CustomForm";
import CustomInput from "../../components/CustomInput";
import SubmitButton from "../../components/SubmitButton";

// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const validationSchema = yup.object().shape({
  title: yup.string().required().label("Title"),
  attachment: yup
    .mixed()
    .test("fileSize", "File Size is too large", (value) => console.log(value))
    .test("fileType", "Unsupported File Format", (value) => console.log(value)),
});

function AddPost() {
  return (
    <SubpageContainer
      title="Dodaj post"
      titleBody="Wpisz tytuł, dodaj zdjęcie i dodaj mema! Zreryfikujemy Twojego posta tak szybko jak to możliwe"
    >
      <CustomForm
        initialValues={{ title: "", attachment: "" }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
        validationSchema={validationSchema}
      >
        <form className={styles.container}>
          <CustomInput type="text" name="title" placeholder="Tytuł..." styling="secondary" />
          <CustomInput type="file" name="attachment" />
          <span className={styles.container_imageInfo}>*zdjęcie nie może być większe niż 2MB</span>
          <SubmitButton value="Dodaj" />
        </form>
      </CustomForm>
    </SubpageContainer>
  );
}

export default AddPost;
