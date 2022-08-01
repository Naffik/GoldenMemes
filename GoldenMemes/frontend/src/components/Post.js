import React from "react";
import mem from "../assets/img/mem1.png";
import styles from "./Post.module.scss";

import { FaFacebookF, FaComment } from "react-icons/fa";
import { AiFillLike, AiFillDislike } from "react-icons/ai";

function Post(props) {
  const { author, comments, date, dislikes, likes, title } = props.data;

  return (
    <div className={styles.container}>
      <div className={styles.container__wrapper}>
        <div className={styles.container__wrapper__topbar}>
          <span>{author}</span>
          <span>{date}</span>
        </div>
        <h2>{title}</h2>
        <img src={mem} alt="mem" />
        <div className={styles.container__wrapper__bottombar}>
          <FaFacebookF className={styles.container__wrapper__bottombar_icon} color="#C1C1C1" />
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
            <span style={{ marginRight: 4 }}>{comments}</span>
            <FaComment className={styles.container__wrapper__bottombar_icon} color="#E0A610" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
