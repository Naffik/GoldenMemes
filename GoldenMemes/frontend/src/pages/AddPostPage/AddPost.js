import React from "react";
import styles from "./AddPost.module.scss";
import CustomButton from "../../components/CustomButton";
import SubpageContainer from "../../components/SubpageContainer";

function AddPost() {
  return (
    <SubpageContainer title="Dodaj post">
      <div className={styles.container}>
        <input type="text" name="title" value="" placeholder="Tytuł..." />
        <input type="file" accept="image/png, image/jpeg" />

        <CustomButton value="Dodaj" />
      </div>
    </SubpageContainer>
  );
}

export default AddPost;
