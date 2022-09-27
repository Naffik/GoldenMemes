import React, { useRef, useState, useEffect } from "react";
import styles from "./AddPost.module.scss";
import * as yup from "yup";

import SubpageContainer from "../../components/layoutContainers/SubpageContainer";
import CustomForm from "../../components/forms/CustomForm";
import CustomInput from "../../components/forms/CustomInput";
import CustomFileInput from "../../components/forms/CustomFileInput";
import SubmitButton from "../../components/forms/SubmitButton";
import { useSelector } from "react-redux";
import { SubmitPostCall } from "../../api/apiCalls";
import { isFileError } from "../../utils/functions";
import ErrorMessage from "../../components/ErrorMessage";
import Notification from "../../components/Notification";

const validationSchema = yup.object().shape({
  title: yup.string().required().label("Title"),
  //attachment: yup.mixed().nullable().required(),
});

function AddPost() {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [notificationKey, setNotificationKey] = useState(0);
  const [error, setError] = useState(null);

  const fileRef = useRef(null);
  const token = useSelector((state) => state.accessToken);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  const handleSubmit = async (values) => {
    const finalValues = { ...values, attachment: file, tags: ["default1", "default2", "default3"] };
    const data = await SubmitPostCall(finalValues, token);
    console.log("token", token);
    if (data) {
      setNotification("Post added");
      setNotificationKey(notificationKey + 1);
      setError(null);
    } else setError("Wystąpił błąd podczas przetwarzania żądania");
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const error = isFileError(file.size, file.type);
    if (!error) {
      setFile(e.target.files[0]);
      setFileError(null);
    } else setFileError(error);
  };

  const handleUpload = () => {
    fileRef.current.click();
  };

  return (
    <SubpageContainer
      title="Dodaj post"
      titleBody="Wpisz tytuł, dodaj zdjęcie i dodaj mema! Zreryfikujemy Twojego posta tak szybko jak to możliwe"
    >
      <CustomForm
        initialValues={{ title: "" }}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
          setFile(null);
        }}
        validationSchema={validationSchema}
      >
        <form className={styles.container}>
          <CustomInput type="text" name="title" placeholder="Tytuł..." styling="secondary" />
          <input ref={fileRef} hidden type="file" name="attach" onChange={handleChange} />
          <div className={styles.container_uploadBtn} onClick={handleUpload}>
            <span className={styles.container_uploadBtn_name}> {file ? file.name : "Wybierz zdjęcie"} </span>
          </div>
          <span className={styles.container_imageInfo}>*zdjęcie nie może być większe niż 2MB</span>
          {fileError && <ErrorMessage message={fileError} />}
          <SubmitButton value="Dodaj" />
          {error && <ErrorMessage message={error} />}
        </form>
      </CustomForm>
      {notification && (
        <Notification title="Dodałeś post!" message="Będzie on widoczny na stronie głównej" key={notificationKey} />
      )}
    </SubpageContainer>
  );
}

export default AddPost;
