import React from "react";
import styles from "./Post.module.scss";
import { useNavigate } from "react-router-dom";

import { FaFacebookF, FaComment } from "react-icons/fa";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { PostDislikeCall, PostLikeCall } from "../api/apiCalls";

function Post(props) {
  const { author, comments, date, dislikes, id, image, likes, tags, title } = props;
  const navigate = useNavigate();
  const handlePostClick = () => {
    navigate(`/post/${id}`, { state: { ...props } });
  };

  const handleAuthorClick = () => {
    navigate(`/profile/${author}`);
  };

  const handleLike = async () => {
    let res = await PostLikeCall(id);
  };

  const handleDislike = async () => {
    let res = await PostDislikeCall(id);
  };

  const renderTags = () => {
    return (
      <>
        {tags.map((tag, idx) => (
          <p key={idx}>#{tag}</p>
        ))}
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__wrapper}>
        <div className={styles.container__wrapper__topbar}>
          <span onClick={handleAuthorClick}>{author}</span>
          <span>{date}</span>
        </div>
        <h2 onClick={handlePostClick}>{title}</h2>
        <img src={image} alt="mem" />
        <div className={styles.container__wrapper__bottombar}>
          <FaFacebookF
            className={`${styles.container__wrapper__bottombar__icon} ${styles.container__wrapper__bottombar__icon__facebook}`}
            color="#C1C1C1"
          />
          <div className={styles.container__wrapper__bottombar__rates}>
            <div className={styles.container__wrapper__bottombar_iconContainer}>
              <span>{likes}</span>
              <AiFillLike
                onClick={handleLike}
                className={`${styles.container__wrapper__bottombar__icon} ${styles.container__wrapper__bottombar__icon__like}`}
              />
            </div>
            <div className={styles.container__wrapper__bottombar_iconContainer}>
              <span>{dislikes}</span>
              <AiFillDislike
                onClick={handleDislike}
                className={`${styles.container__wrapper__bottombar__icon} ${styles.container__wrapper__bottombar__icon__dislike}`}
              />
            </div>
          </div>
          <div className={styles.container__wrapper__bottombar_iconContainer} onClick={handlePostClick}>
            <span style={{ marginRight: 8 }}>{comments}</span>
            <FaComment
              className={`${styles.container__wrapper__bottombar__icon} ${styles.container__wrapper__bottombar__icon__comment}`}
            />
          </div>
        </div>
        <div className={styles.container__wrapper__tagbar}>{renderTags()}</div>
      </div>
    </div>
  );
}

export default Post;
