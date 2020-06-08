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
  const [field, { error }, helpers] = useField(props);
  return (
    <>
      <div
        className={
          error
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
          error={error || ""}
          label={props.label}
          onChange={field.onChange}
          hint={props.hint}
          value={field.value || ""}
          data-cy={props.name}
        >
          <Select.Option value="">-- Please select --</Select.Option>
          {props.options
            ? props.options.map(option => (
                <Select.Option key={option.value} value={option.value}>
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
