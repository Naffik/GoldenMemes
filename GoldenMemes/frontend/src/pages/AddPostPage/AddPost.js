import React from "react";
import styles from "./AddPost.module.scss";
import CustomButton from "../../components/CustomButton";
import SubpageContainer from "../../components/SubpageContainer";

function AddPost() {
  return (
    <SubpageContainer
      title="Dodaj post"
      titleBody="Wpisz tytuł, dodaj zdjęcie i dodaj mema! Zreryfikujemy Twojego posta tak szybko jak to możliwe"
    >
      <div className={styles.container}>
        <input type="text" name="title" value="" placeholder="Tytuł..." />
        <input type="file" accept="image/png, image/jpeg" />
        <span className={styles.container_imageInfo}>*zdjęcie nie może być większe niż 2MB</span>
        <CustomButton value="Dodaj" />
      </div>
    </SubpageContainer>
  );
}

export default AddPost;
