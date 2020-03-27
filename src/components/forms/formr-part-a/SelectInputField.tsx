import { Field } from "formik";
import React from "react";
import { Label } from "nhsuk-react-components";

export const SelectInputField: React.FC<any> = ({
  label,
  options,
  ...field
}) => {
  return (
    <>
      {label && label !== "" ? <Label>{label}</Label> : null}
      <Field
        className="nhsuk-select"
        as="select"
        {...field}
        style={{ width: "100%", marginBottom: 10 }}
      >
        <option value="">-- Please select--</option>
        {options
          ? options.map((o: { value: string; label: string }) => (
              <option key={o.label} value={o.value}>
                {o.label}
              </option>
            ))
          : null}
      </Field>
    </>
  );
};
