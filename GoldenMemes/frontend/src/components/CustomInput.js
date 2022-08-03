import React from "react";
import styles from "./CustomInput.module.scss";
import { useFormikContext } from "formik";

function CustomInput({ name, ...otherProps }) {
  const { handleChange, values } = useFormikContext();

  return (
    <input className={styles.input} name={name} value={values[name]} onChange={handleChange(name)} {...otherProps} />
  );
}

export default CustomInput;
