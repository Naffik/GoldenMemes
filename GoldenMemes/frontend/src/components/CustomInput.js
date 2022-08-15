import React from "react";
import styles from "./CustomInput.module.scss";
import { useFormikContext } from "formik";

function CustomInput({ inputRef = null, styling = "default", name, ...otherProps }) {
  const { handleChange, setFieldTouched, values, errors, touched } = useFormikContext();

  return (
    <>
      <input
        ref={inputRef}
        className={`${styles["input-default"]} ${styling && styles["input-" + styling]}`}
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
