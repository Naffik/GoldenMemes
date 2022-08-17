import React from "react";
import CustomButton from "../CustomButton";
import { useFormikContext } from "formik";

function SubmitButton({ icon = null, value }) {
  const { handleSubmit } = useFormikContext();

  return <CustomButton onClick={handleSubmit} value={value} type="submit" icon={icon} />;
}

export default SubmitButton;
