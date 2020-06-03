import React from "react";
import { connect, useField } from "formik";
import { Checkboxes, Radios, Label } from "nhsuk-react-components";
import InputFooterLabel from "./InputFooterLabel";

interface Props {
  name: string;
  type: "radios" | "checkbox";
  items: any[];
  label?: string;
  id?: string;
  hint?: any;
  footer?: any;
}

const MultiChoiceInputField: React.FC<Props> = props => {
  const [field, { error }, helpers] = useField(props);
  const FormElement = props.type === "radios" ? Radios : Checkboxes;
  const FormChildElement =
    props.type === "radios" ? Radios.Radio : Checkboxes.Box;
  return (
    <div
      data-jest={props.name}
      className={
        error ? "nhsuk-form-group nhsuk-form-group--error" : "nhsuk-form-group"
      }
    >
      <Label>{props.label}</Label>
      <FormElement
        name={props.name}
        id={props.id || props.name}
        error={error || ""}
        onChange={field.onChange}
        hint={props.hint}
      >
        {props.items
          ? props.items.map((item, index) => (
              <FormChildElement
                key={item.value}
                value={item.value}
                id={item.id || "item_" + index}
                checked={
                  typeof field.value === "boolean"
                    ? field.value
                    : field.value && field.value.includes(item.value)
                }
                onChange={() => {
                  helpers.setValue(item.value);
                }}
              >
                {item.label}
              </FormChildElement>
            ))
          : null}
      </FormElement>
      <InputFooterLabel label={props.footer || ""} />
    </div>
  );
};

export default connect(MultiChoiceInputField);
