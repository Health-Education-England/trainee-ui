import React from "react";
import { connect, useField } from "formik";
import { Select } from "nhsuk-react-components";
import InputFooterLabel from "./InputFooterLabel";

interface Props {
  name: string;
  label: string;
  id?: string;
  hint?: string;
  options?: any[];
  footer?: any;
}

const SelectInputField: React.FC<Props> = props => {
  const [field, { error, touched }, helpers] = useField(props);
  return (
    <>
      <div
        className={
          error && touched
            ? "nhsuk-form-group nhsuk-form-group--error"
            : "nhsuk-form-group"
        }
      >
        <Select
          name={props.name}
          id={props.id || props.name}
          onBlur={() => {
            helpers.setTouched(true);
          }}
          error={error && touched ? error : ""}
          label={props.label}
          onChange={field.onChange}
        >
          <Select.Option value="">-- Please select --</Select.Option>
          {props.options
            ? props.options.map((option: { value: string; label: string }) => (
                <Select.Option
                  selected={field.value === option.value ? true : false}
                  value={option.value}
                >
                  {option.label}
                </Select.Option>
              ))
            : null}
        </Select>
        <InputFooterLabel label={props.footer || ""} />
      </div>
    </>
  );
};

export default connect(SelectInputField);
