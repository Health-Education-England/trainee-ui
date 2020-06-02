import React from "react";
import { shallow, mount } from "enzyme";
import Section1 from "../Sections/Section1";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";

const props = {
  localOffices: [],
  curricula: [],
  formData: submittedFormRPartBs[0],
  nextSection: jest.fn()
};

describe("Form-R Part-B Section1", () => {
  it("renders without crashing", () => {
    shallow(<Section1 {...props} />);
  });

  it("mounts without crashing", () => {
    mount(<Section1 {...props} />);
  });

  it("should render next section link buttons", async () => {
    const wrapper = mount(<Section1 {...props} />);

    expect(wrapper.find("li.nhsuk-pagination-item--next").length).toBe(1);
    wrapper.find("a.nhsuk-pagination__link--next").first().simulate("click");
  });
});
