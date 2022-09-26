import React from "react";
import styles from "./CustomInput.module.scss";
import { useFormikContext } from "formik";
import ErrorMessage from "../ErrorMessage";

function CustomInput({ inputRef = null, styling = "default", name, type, ...otherProps }) {
  const { handleChange, setFieldTouched, setFieldValue, values, errors, touched } = useFormikContext();

  return (
    <>
      <input
        type={type}
        ref={inputRef}
        className={`${styles["input-default"]} ${styling && styles["input-" + styling]}`}
        name={name}
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        onChange={(e) => {
          console.log("e", e);
          setFieldValue(name, e.target.files[0]);
        }}
        {...otherProps}
      />

      {touched[name] && errors[name] && <ErrorMessage message={errors[name]} />}
    </>
  );
}

export default CustomInput;
