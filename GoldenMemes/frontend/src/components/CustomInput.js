import React from "react";
import styles from "./CustomInput.module.scss";
import { useFormikContext } from "formik";

function CustomInput({ name, ...otherProps }) {
  const { handleChange, setFieldTouched, values, errors, touched } = useFormikContext();

  return (
    <>
      <input
        className={styles.input}
        name={name}
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        onChange={handleChange(name)}
        {...otherProps}
      />
      {touched[name] && errors[name] && <span className={styles.error}>{errors[name]}</span>}
    </>
  );
}

export default CustomInput;
