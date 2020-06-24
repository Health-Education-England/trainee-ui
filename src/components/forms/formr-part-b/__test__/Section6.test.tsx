import React from "react";
import { shallow, mount } from "enzyme";
import Section6 from "../Sections/Section6";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";
import { SectionProps } from "../Sections/SectionProps";

const prevSection = jest.fn();
const nextSection = jest.fn();

const props: SectionProps = {
  formData: submittedFormRPartBs[0],
  previousSection: prevSection,
  nextSection: nextSection
};

describe("Form-R Part-B Section6", () => {
  it("renders without crashing", () => {
    shallow(<Section6 {...props} />);
  });

  it("mounts without crashing", () => {
    mount(<Section6 {...props} />);
  });

  it("should render page heading", () => {
    const wrapper = mount(<Section6 {...props} />);
    expect(wrapper.find("[data-jest='mainFieldset6'] legend").length).toBe(1);
  });

  it("should render previous section link buttons", () => {
    const wrapper = mount(<Section6 {...props} />);

    expect(wrapper.find("li.nhsuk-pagination-item--previous").length).toBe(1);
    wrapper.find("a.nhsuk-pagination__link--prev").first().simulate("click");
    expect(prevSection).toHaveBeenCalled();
  });

  it("should render next section link buttons", () => {
    const wrapper = mount(<Section6 {...props} />);

    expect(wrapper.find("li.nhsuk-pagination-item--next").length).toBe(1);
    wrapper.find("a.nhsuk-pagination__link--next").first().simulate("click");
    expect(nextSection).toHaveBeenCalled();
  });

  it("should submit the form", () => {
    const wrapper = mount(<Section6 {...props} />);
    const form = wrapper.find("form").first();

    try {
      form.simulate("submit");
      expect(nextSection).toHaveBeenCalled();
    } catch (e) {
      expect(true).toBe(false);
    }
  });
});
