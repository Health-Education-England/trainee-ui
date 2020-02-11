import React from "react";
import renderer from "react-test-renderer";
import App from "./App";

// All the tests are run using test runner 'jest'
// This is a snapshot test using react-test-renderer

it("renders correctly when there are no items", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
