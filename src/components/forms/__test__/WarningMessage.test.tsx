import React from "react";
import WarningMessage from "../WarningMessage";
import { shallow } from "enzyme";

describe("WarningMessage", () => {
  it("renders without crashing", () => {
    shallow(<WarningMessage />);
  });
});
