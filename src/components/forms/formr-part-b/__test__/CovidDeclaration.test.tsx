import React from "react";
import { shallow, mount } from "enzyme";
import CovidDeclaration from "../Sections/CovidDeclaration";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";

jest.mock("../ValidationSchema", () => ({
  get CovidSectionValidationSchema() {
    return null;
  }
}));

const mockFn = jest.fn();

const props = {
  formData: submittedFormRPartBs[0],
  previousSection: mockFn,
  nextSection: mockFn,
  saveDraft: mockFn
};

describe("Form-R Part-B CovidDeclaration", () => {
  it("renders without crashing", () => {
    shallow(<CovidDeclaration {...props} />);
  });

  it("mounts without crashing", () => {
    mount(<CovidDeclaration {...props} />);
  });

  it("should render next section link buttons", async () => {
    const wrapper = mount(<CovidDeclaration {...props} />);

    expect(wrapper.find("li.nhsuk-pagination-item--next").length).toBe(1);
    wrapper.find("a.nhsuk-pagination__link--next").first().simulate("click");
  });
});
