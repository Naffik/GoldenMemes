import React, { useState } from "react";
import styles from "./Post.module.scss";
import { useNavigate } from "react-router-dom";

import { FaFacebookF, FaComment } from "react-icons/fa";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { PostDislikeCall, PostLikeCall } from "../api/apiCalls";

function Post(props) {
  const {
    author,
    comments,
    date,
    dislikes,
    id,
    image,
    is_liked = false,
    is_disliked = false,
    likes,
    tags,
    title,
  } = props;

  const [likeRating, setLikeRating] = useState({ count: likes, rated: is_liked }); //like ui handling
  const [dislikeRating, setDislikeRating] = useState({ count: dislikes, rated: is_disliked }); //dislike ui handling

  const navigate = useNavigate();
  const handlePostClick = () => {
    navigate(`/post/${id}`, { state: { ...props } });
  };

  const handleAuthorClick = () => {
    navigate(`/profile/${author}`);
  };

  const handleLike = async () => {
    let res = await PostLikeCall(id);
    if (res) setLikeRating({ count: likeRating.count + 1, rated: true });
    if (dislikeRating.rated === true) setDislikeRating({ count: dislikeRating.count - 1, rated: false });
    else {
      console.log("WYstąpił błąd podczas ratingu");
    }
  };

  const handleDislike = async () => {
    let res = await PostDislikeCall(id);
    if (res) setDislikeRating({ count: dislikeRating.count + 1, rated: true });
    if (likeRating.rated === true) setLikeRating({ count: likeRating.count - 1, rated: false });
    else {
      console.log("WYstąpił błąd podczas ratingu");
    }
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
              <span>{likeRating.count}</span>
              <AiFillLike
                onClick={() => !likeRating.rated && handleLike()}
                className={`${styles.container__wrapper__bottombar__icon} ${
                  styles.container__wrapper__bottombar__icon__like
                } ${likeRating.rated && styles.container__wrapper__bottombar__icon__like__active}`}
              />
            </div>
            <div className={styles.container__wrapper__bottombar_iconContainer}>
              <span>{dislikeRating.count}</span>
              <AiFillDislike
                onClick={() => !dislikeRating.rated && handleDislike()}
                className={`${styles.container__wrapper__bottombar__icon} ${
                  styles.container__wrapper__bottombar__icon__dislike
                } ${dislikeRating.rated && styles.container__wrapper__bottombar__icon__dislike__active}`}
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
