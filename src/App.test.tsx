import React from "react";
import App from "./App";
import { shallow } from "enzyme";

// All the tests are run using the test runner 'Jest'

// This is unit test using enzyme
// For more read on enzyme https://gist.github.com/fokusferit/e4558d384e4e9cab95d04e5f35d4f913
it("renders without crashing", () => {
  shallow(<App />);
});
