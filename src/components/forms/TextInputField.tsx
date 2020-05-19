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
  const [field, { error, touched }] = useField(props);
  const FormElement = props.rows ? Textarea : Input;

  const setFieldWidth = (width: number) => {
    return width < 20 ? 20 : Math.floor(width / 10) * 10;
  };

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
          width={
            field.value ? props.width || setFieldWidth(field.value.length) : 20
          }
          error={error && touched ? error : ""}
          id={props.id || props.name}
          onBlur={field.onBlur}
          onChange={field.onChange}
          value={field.value}
          {...props}
        />
        <InputFooterLabel label={props.footer || ""} />
      </div>
    </>
  );
};

export default connect(TextInputField);
