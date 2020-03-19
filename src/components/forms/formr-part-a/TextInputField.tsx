import { Field } from "formik";
import React from "react";
import { Label } from "nhsuk-react-components";

export const TextInputField: React.FC<any> = ({ label, ...field }) => {
  return (
    <>
      {label && label !== "" ? <Label>{label}</Label> : null}
      <Field className="nhsuk-input" {...field} style={{ marginBottom: 10 }} />
    </>
  );
};
