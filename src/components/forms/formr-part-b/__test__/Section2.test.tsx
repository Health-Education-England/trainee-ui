import React from "react";
import { shallow, mount } from "enzyme";
import Section2 from "../Sections/Section2";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";

const prevSection = jest.fn();
const nextSection = jest.fn();

const props = {
  formData: submittedFormRPartBs[0],
  previousSection: prevSection,
  nextSection: nextSection,
  history: []
};

describe("Form-R Part-B Section2", () => {
  it("renders without crashing", () => {
    shallow(<Section2 {...props} />);
  });

  it("mounts without crashing", () => {
    mount(<Section2 {...props} />);
  });

  it("should add work panel if no placements exists", () => {
    props.formData.work = [];
    const wrapper = mount(<Section2 {...props} />);

    expect(wrapper.find("[data-jest='workPanel']").length).toBe(1);
  });

  it("should add work panel on 'Add more' button click", () => {
    const wrapper = mount(<Section2 {...props} />);

    expect(wrapper.find("[data-jest='workPanel']").length).toBe(
      props.formData.work.length
    );

    const addMoreButton = wrapper.find("[data-jest='addMore']").first();
    addMoreButton.simulate("click");

    expect(wrapper.find("[data-jest='workPanel']").length).toBe(
      props.formData.work.length + 1
    );
  });

  it("should remove work panel on 'Delete' button click", () => {
    const wrapper = mount(<Section2 {...props} />);

    const addMoreButton = wrapper.find("[data-jest='addMore']").first();
    addMoreButton.simulate("click");

    const removePanelButton = wrapper.find("[data-jest='removePanel']").first();
    removePanelButton.simulate("click");

    expect(wrapper.find("[data-jest='workPanel']").length).toBe(
      props.formData.work.length
    );
  });

  it("should render previous section link buttons", () => {
    const wrapper = mount(<Section2 {...props} />);

    expect(wrapper.find("li.nhsuk-pagination-item--previous").length).toBe(1);
    wrapper
      .find("a.nhsuk-pagination__link--prev")
      .first()
      .simulate("click");
    expect(prevSection).toHaveBeenCalled();
  });

  it("should render next section link buttons", async () => {
    const wrapper = mount(<Section2 {...props} />);

    expect(wrapper.find("li.nhsuk-pagination-item--next").length).toBe(1);
    wrapper
      .find("a.nhsuk-pagination__link--next")
      .first()
      .simulate("click");
  });
});