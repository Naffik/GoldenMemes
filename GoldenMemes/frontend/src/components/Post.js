import React from "react";
import styles from "./Post.module.scss";

import { FaFacebookF, FaComment } from "react-icons/fa";
import { AiFillLike, AiFillDislike } from "react-icons/ai";

function Post({ author, comments, date, dislikes, image, likes, title }) {
  return (
    <div className={styles.container}>
      <div className={styles.container__wrapper}>
        <div className={styles.container__wrapper__topbar}>
          <span>{author}</span>
          <span>{date}</span>
        </div>
        <h2>{title}</h2>
        <img src={image} alt="mem" />
        <div className={styles.container__wrapper__bottombar}>
          <div className={styles.container__wrapper__bottombar__rates}>
            <div className={styles.container__wrapper__bottombar_iconContainer}>
              <span>{likes}</span>
              <AiFillLike className={styles.container__wrapper__bottombar_icon} color="#0CB51D" />
            </div>
            <div className={styles.container__wrapper__bottombar_iconContainer}>
              <span>{dislikes}</span>
              <AiFillDislike className={styles.container__wrapper__bottombar_icon} color="#E01010" />
            </div>
          </div>
          <div className={styles.container__wrapper__bottombar_iconContainer}>
            <span style={{ marginRight: 8 }}>{comments}</span>
            <FaComment className={styles.container__wrapper__bottombar_icon} color="#E0A610" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
