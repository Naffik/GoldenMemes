import React from "react";
import { Formik } from "formik";

function CustomForm({ initialValues, onSubmit, children }) {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {() => <>{children}</>}
    </Formik>
  );
}

export default CustomForm;
