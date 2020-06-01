import React from "react";
import { shallow, mount } from "enzyme";
import Section3 from "../Sections/Section3";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";

const prevSection = jest.fn();
const nextSection = jest.fn();

const props = {
  formData: submittedFormRPartBs[0],
  previousSection: prevSection,
  nextSection: nextSection,
  history: []
};

describe("Form-R Part-B Section3", () => {
  it("renders without crashing", () => {
    shallow(<Section3 {...props} />);
  });

  it("mounts without crashing", () => {
    mount(<Section3 {...props} />);
  });

  it("should render page heading", () => {
    const wrapper = mount(<Section3 {...props} />);
    expect(wrapper.find("[data-jest='mainFieldset'] legend").length).toBe(1);
  });

  it("should render single checkbox for acceptance of honesty and integrity", () => {
    const wrapper = mount(<Section3 {...props} />);
    expect(wrapper.find("[data-jest='isHonest'] input").length).toBe(1);
  });

  it("should render single checkbox for acceptance of personal health", () => {
    const wrapper = mount(<Section3 {...props} />);
    expect(wrapper.find("[data-jest='isHealthy'] input").length).toBe(1);
  });

  it("should render two radio buttons for flagging of GMC conditions or warnings", () => {
    const wrapper = mount(<Section3 {...props} />);
    expect(wrapper.find("[data-jest='isWarned'] input").length).toBe(2);
  });

  it("should render health statement textarea", () => {
    const wrapper = mount(<Section3 {...props} />);
    expect(wrapper.find("textarea").length).toBe(1);
  });

  it("should render GMC conditions or warnings radio button values as true and false", () => {
    const component = mount(<Section3 {...props} />);
    const wrapper = component.find("[data-jest='isWarned'] input");
    expect(wrapper.at(0).prop("value")).toBe("true");
    expect(wrapper.at(1).prop("value")).toBe("false");
  });

  it("should show single checkbox for compying with conditions or warnings when GMC conditions or warnings set to true ", () => {
    const component = mount(<Section3 {...props} />);
    const wrapper = component.find("[data-jest='isWarned'] input");
    wrapper.at(0).simulate("click");
    expect(component.find("[data-jest='isComplying']").length).toBe(1);
  });

  it("should render previous section link buttons", () => {
    const wrapper = mount(<Section3 {...props} />);

    expect(wrapper.find("li.nhsuk-pagination-item--previous").length).toBe(1);
    wrapper
      .find("a.nhsuk-pagination__link--prev")
      .first()
      .simulate("click");
    expect(prevSection).toHaveBeenCalled();
  });

  it("should render next section link buttons", async () => {
    const wrapper = mount(<Section3 {...props} />);

    expect(wrapper.find("li.nhsuk-pagination-item--next").length).toBe(1);
    wrapper
      .find("a.nhsuk-pagination__link--next")
      .first()
      .simulate("click");
  });
});
