import React, { useEffect, useRef } from "react";
import { slideLeftInAndOut } from "../animations/animations";
import styles from "./Notification.module.scss";
import { BsFillCheckCircleFill } from "react-icons/bs";

function Notification({ message, title }) {
  const notificationRef = useRef();

  useEffect(() => {
    slideLeftInAndOut(notificationRef.current, 450);
  }, []);

  return (
    <div ref={notificationRef} className={styles.container}>
      <BsFillCheckCircleFill className={styles.container_icon} />
      <div className={styles.container_content}>
        <h4 className={styles.container_content_title}>{title}</h4>
        <p className={styles.container_content_message}>{message}</p>
      </div>
    </div>
  );
}

export default Notification;
