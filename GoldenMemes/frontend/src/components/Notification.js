import React, { useEffect, useRef } from "react";
import { slideNotification } from "../animations/animations";
import styles from "./Notification.module.scss";
import { BsFillCheckCircleFill } from "react-icons/bs";

function Notification({ message }) {
  const notificationRef = useRef();

  useEffect(() => {
    slideNotification(notificationRef.current);
  }, []);

  return (
    <div ref={notificationRef} className={styles.container}>
      <BsFillCheckCircleFill size={24} color="#f8f8f8" />
      <p className={styles.container_value}>{message}</p>
    </div>
  );
}

export default Notification;
