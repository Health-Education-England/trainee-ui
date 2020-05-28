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
