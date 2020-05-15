import React from "react";
import SelectInputField from "../SelectInputField";
import { shallow } from "enzyme";

describe("SelectInputField", () => {
  it("renders without crashing", () => {
    shallow(
      <SelectInputField name="selectInputField" label="Select input field" />
    );
  });
});
