import React from "react";
import TextInputField from "../TextInputField";
import { shallow } from "enzyme";

describe("TextInputField", () => {
  it("renders without crashing", () => {
    shallow(<TextInputField name="TextInputField" label="Text Input Field" />);
  });
});
