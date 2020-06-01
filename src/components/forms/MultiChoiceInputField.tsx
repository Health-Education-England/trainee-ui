import React from "react";
import { connect, useField } from "formik";
import { Checkboxes, Radios, Label } from "nhsuk-react-components";
import InputFooterLabel from "./InputFooterLabel";

interface Props {
  name: string;
  label: string;
  type: "radio" | "checkbox";
  items?: any[];
  id?: string;
  hint?: string;
  footer?: any;
}

const MultiChoiceInputField: React.FC<Props> = props => {
  const [field, { error }] = useField(props);
  const FormElement = props.type === "radio" ? Radios : Checkboxes;
  const FormChildElement =
    props.type === "radio" ? Radios.Radio : Checkboxes.Box;
  return (
    <>
      <div
        data-jest={props.name}
        className={
          error
            ? "nhsuk-form-group nhsuk-form-group--error"
            : "nhsuk-form-group"
        }
      >
        <Label>{props.label}</Label>
        <FormElement
          name={props.name}
          id={props.id || props.name}
          error={error || ""}
          onChange={field.onChange}
          hint={props.hint}
          value={field.value || ""}
        >
          {props.items
            ? props.items.map((item, index) => (
                <FormChildElement
                  key={item.value}
                  value={item.value}
                  id={item.id || item.value + "_" + index}
                  checked={item.checked || undefined}
                >
                  {item.label}
                </FormChildElement>
              ))
            : null}
        </FormElement>
        <InputFooterLabel label={props.footer || ""} />
      </div>
    </>
  );
};

export default connect(MultiChoiceInputField);