import React from "react";
import { shallow, mount } from "enzyme";
import Section4 from "../Sections/Section4";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";

const prevSection = jest.fn();
const nextSection = jest.fn();

const props = {
  formData: submittedFormRPartBs[0],
  previousSection: prevSection,
  nextSection: nextSection,
  history: [],
  section: 4
};

describe("Form-R Part-B Section4", () => {
  it("renders without crashing", () => {
    shallow(<Section4 {...props} />);
  });

  it("mounts without crashing", () => {
    mount(<Section4 {...props} />);
  });

  it("should render page heading", () => {
    const wrapper = mount(<Section4 {...props} />);
    expect(wrapper.find("[data-jest='mainFieldset4'] legend").length).toBe(1);
  });

  it("should render two radio buttons for flagging previous Significant Events, Complaints, Other investigations", () => {
    const wrapper = mount(<Section4 {...props} />);
    expect(
      wrapper.find("[data-jest='havePreviousDeclarations'] input").length
    ).toBe(2);
  });

  it("should render values of two radio buttons for flagging previous Significant Events, Complaints, Other investigations as true and false", () => {
    const component = mount(<Section4 {...props} />);
    const wrapper = component.find(
      "[data-jest='havePreviousDeclarations'] input"
    );
    expect(wrapper.first().prop("value")).toBe("true");
    expect(wrapper.last().prop("value")).toBe("false");
  });

  it("should render a 'previous declaration' panel when 'yes' radio for flagging previous Significant Events, Complaints, Other investigations is true ", () => {
    const component = mount(<Section4 {...props} />);
    const wrapper = component.find(
      "[data-jest='havePreviousDeclarations'] input"
    );
    wrapper.first().simulate("click");
    expect(component.find("[data-jest='declarationPanel4']").length).toBe(1);
  });

  it("should render a new panel when clicking on 'Add more'", async () => {
    const component = mount(<Section4 {...props} />);
    const wrapper = component.find("div.placementPanel");
    const panelLength = wrapper.length;
    component.find("button[data-jest='btnAddDeclaration']").simulate("click");
    expect(component.find("div.placementPanel").length).toBe(panelLength + 1);
  });

  it("should remove a panel when clicking on delete panel button", async () => {
    const component = mount(<Section4 {...props} />);
    const wrapper = component.find("div.placementPanel");
    const panelLength = wrapper.length;
    component.find("button[data-jest='btnAddDeclaration']").simulate("click");
    expect(component.find("div.placementPanel").length).toBe(panelLength + 1);
    component.find("button[data-jest='removePanel']").last().simulate("click");
    expect(component.find("div.placementPanel").length).toBe(panelLength);
  });

  it("should render a 'summary of previous unresolved declarations' textarea when 'yes' radio for flagging previous Significant Events, Complaints, Other investigations is true ", () => {
    const component = mount(<Section4 {...props} />);
    const wrapper = component.find(
      "[data-jest='havePreviousDeclarations'] input"
    );
    wrapper.first().simulate("click");
    expect(
      component.find("[data-jest='previousDeclarationsSummaryTextInput']")
    ).toBeTruthy();
  });

  it("should render previous section link buttons", () => {
    const wrapper = mount(<Section4 {...props} />);
    expect(wrapper.find("a[data-jest='BacklinkToSection3']").length).toBe(1);
    wrapper.find("a[data-jest='BacklinkToSection3']").first().simulate("click");
    expect(prevSection).toHaveBeenCalled();
  });

  it("should render next section link buttons", async () => {
    const wrapper = mount(<Section4 {...props} />);
    expect(wrapper.find("a[data-jest='linkToSection5']").length).toBe(1);
  });
});
