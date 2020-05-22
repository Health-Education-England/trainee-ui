import React from "react";
import SelectInputField from "../SelectInputField";
import { shallow, mount } from "enzyme";
import { Formik, Form } from "formik";
import { KeyValue } from "../../../models/KeyValue";

const options: KeyValue[] = [
  { label: "Label1", value: "Value1" },
  { label: "Label2", value: "Value2" }
];

describe("SelectInputField", () => {
  it("renders without crashing", () => {
    shallow(
      <SelectInputField name="selectInputField" label="Select input field" />
    );
  });

  it("should only have default option when no options passed", () => {
    const wrapper = mount(
      <Formik initialValues={null} onSubmit={() => {}}>
        {() => (
          <Form>
            <SelectInputField
              name="selectInputField"
              label="Select input field"
              options={[]}
            />
          </Form>
        )}
      </Formik>
    );

    expect(
      wrapper
        .find("label")
        .first()
        .text()
    ).toBe("Select input field");
    expect(wrapper.find("option").length).toBe(1);
  });

  it("should have options along with default option when options passed", () => {
    const wrapper = mount(
      <Formik initialValues={null} onSubmit={() => {}}>
        {() => (
          <Form>
            <SelectInputField
              name="selectInputField"
              label="Select input field"
              options={options}
            />
          </Form>
        )}
      </Formik>
    );

    expect(wrapper.find("option").length).toBe(3);
  });

  it("should render footer when footer property passed", () => {
    const wrapper = mount(
      <Formik initialValues={null} onSubmit={() => {}}>
        {() => (
          <Form>
            <SelectInputField
              name="selectInputField"
              label="Select input field"
              options={options}
              footer="Footer label"
            />
          </Form>
        )}
      </Formik>
    );

    expect(
      wrapper
        .find("div")
        .last()
        .text()
    ).toBe("Footer label");
  });
});
