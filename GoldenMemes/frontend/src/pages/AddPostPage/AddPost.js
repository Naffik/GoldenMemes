import React, { useRef, useState, useEffect } from "react";
import styles from "./AddPost.module.scss";
import * as yup from "yup";

import SubpageContainer from "../../components/layoutContainers/SubpageContainer";
import CustomForm from "../../components/forms/CustomForm";
import CustomInput from "../../components/forms/CustomInput";
import SubmitButton from "../../components/forms/SubmitButton";
import { SubmitPostCall } from "../../api/apiCalls";
import { isFileError } from "../../utils/functions";
import ErrorMessage from "../../components/ErrorMessage";
import Notification from "../../components/Notification";

const validationSchema = yup.object().shape({
  title: yup.string().required().label("Title"),
  //attachment: yup.mixed().nullable().required(),
});

function AddPost() {
  const [file, setFile] = useState({ file: null, error: null });
  const [notification, setNotification] = useState({ message: null, key: 0 });
  const [error, setError] = useState(null);

  const fileRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  const handleSubmit = async (values) => {
    const finalValues = { ...values, attachment: file.file, status: "accepted", tags: ["tag1", "tag2", "default3"] };
    const data = await SubmitPostCall(finalValues);
    if (data) {
      setNotification((old) => ({ ...old, message: "Post added" }));
      setNotification((old) => ({ ...old, key: old.key + 1 }));
      setError(null);
    } else setError("Wystąpił błąd podczas przetwarzania żądania");
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    const error = isFileError(file.size, file.type);
    if (!error) {
      setFile((old) => ({ ...old, file: e.target.files[0] }));
      setFile((old) => ({ ...old, error: null }));
    } else setFile((old) => ({ ...old, error: error }));
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
          setFile({ file: null, error: null });
        }}
        validationSchema={validationSchema}
      >
        <form className={styles.container}>
          <CustomInput type="text" name="title" placeholder="Tytuł..." styling="secondary" />
          <input ref={fileRef} hidden type="file" name="attach" onChange={handleChange} />
          <div className={styles.container_uploadBtn} onClick={handleUpload}>
            <span className={styles.container_uploadBtn_name}>
              {file.file ? file["file"].name : "Wybierz zdjęcie"}{" "}
            </span>
          </div>
          <p className={styles.container_imageInfo}>*zdjęcie nie może być większe niż 2MB</p>
          {file.error && <ErrorMessage message={file.error} />}
          <CustomInput type="text" name="tags" placeholder="Dodaj tagi po spacji..." styling="secondary-small" />
          <SubmitButton value="Dodaj" />
          {error && <ErrorMessage message={error} />}
        </form>
      </CustomForm>
      {notification.message && (
        <Notification title="Dodałeś post!" message="Będzie on widoczny na stronie głównej" key={notification.key} />
      )}
    </SubpageContainer>
  );
}

export default AddPost;
