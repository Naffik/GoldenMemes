import React from "react";
import CustomButton from "./CustomButton";
import { useFormikContext } from "formik";

function SubmitButton({ value }) {
  const { handleSubmit } = useFormikContext();

  return <CustomButton onClick={handleSubmit} value={value} type="submit" />;
}

export default SubmitButton;
