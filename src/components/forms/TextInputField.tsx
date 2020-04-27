import React from "react";
import { Field } from "formik";
import { Label } from "nhsuk-react-components";

const TextInputField: React.FC<any> = ({ label, ...field }) => {
  return (
    <>
      {label && label !== "" ? <Label>{label}</Label> : null}
      <Field className="nhsuk-input" {...field} style={{ marginBottom: 10 }} />
    </>
  );
};

export default TextInputField;
