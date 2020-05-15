import React, { FunctionComponent } from "react";
import { useField, connect } from "formik";
import { Input, Textarea } from "nhsuk-react-components";
import InputFooterLabel from "./InputFooterLabel";
interface Props {
  name: string;
  label: string;
  id?: string;
  placeholder?: string;
  rows?: number;
  hint?: string;
  width?: any;
  footer?: any;
  type?: string;
}

const TextInputField: FunctionComponent<Props> = props => {
  const [field, { error, touched }] = useField({
    name: props.name,
    type: props.name
  });
  const FormElement = props.rows ? Textarea : Input;

  return (
    <>
      <div
        className={
          error && touched
            ? "nhsuk-form-group nhsuk-form-group--error"
            : "nhsuk-form-group"
        }
      >
        <FormElement
          width={props.width || 20}
          error={error && touched ? error : ""}
          id={props.id || props.name}
          {...field}
          {...props}
        />
        <InputFooterLabel label={props.footer || ""} />
      </div>
    </>
  );
};

export default connect(TextInputField);
