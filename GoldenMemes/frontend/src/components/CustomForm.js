import React from "react";
import { Formik } from "formik";

function CustomForm({ initialValues, onSubmit, validationSchema = null, children }) {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {() => <>{children}</>}
    </Formik>
  );
}

export default CustomForm;
