import React from "react";
import { shallow, mount } from "enzyme";
import Section5 from "../Sections/Section5";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";

const prevSection = jest.fn();
const handleSubmit = jest.fn();

const props = {
  formData: submittedFormRPartBs[0],
  previousSection: prevSection,
  handleSubmit: handleSubmit,
  history: [],
  section: 5
};

describe("Form-R Part-B Section5", () => {
  it("renders without crashing", () => {
    shallow(<Section5 {...props} />);
  });

  it("mounts without crashing", () => {
    mount(<Section5 {...props} />);
  });

  it("should render page heading", () => {
    const wrapper = mount(<Section5 {...props} />);
    expect(wrapper.find("[data-jest='mainFieldset5'] legend").length).toBe(1);
  });

  it("should render two radio buttons for flagging current Significant Events, Complaints, Other investigations", () => {
    const wrapper = mount(<Section5 {...props} />);
    expect(
      wrapper.find("[data-jest='haveCurrentDeclarations'] input").length
    ).toBe(2);
  });

  it("should render a new panel when clicking on 'Add more'", async () => {
    const component = mount(<Section5 {...props} />);
    const wrapper = component.find("div.placementPanel");
    const panelLength = wrapper.length;
    component.find("button[data-jest='btnAddDeclaration']").simulate("click");
    component.update();
    expect(component.find("div.placementPanel").length).toBe(panelLength + 1);
  });

  it("should remove a panel when clicking on delete panel button", async () => {
    const component = mount(<Section5 {...props} />);
    const wrapper = component.find("div.placementPanel");
    const panelLength = wrapper.length;
    component.find("button[data-jest='btnAddDeclaration']").simulate("click");
    component.update();
    expect(component.find("div.placementPanel").length).toBe(panelLength + 1);
    component.find("button[data-jest='removePanel']").last().simulate("click");
    component.update();
    expect(component.find("div.placementPanel").length).toBe(panelLength);
  });

  it("should render values of two radio buttons for flagging current Significant Events, Complaints, Other investigations as true and false", () => {
    const component = mount(<Section5 {...props} />);
    const wrapper = component.find(
      "[data-jest='haveCurrentDeclarations'] input"
    );
    expect(wrapper.first().prop("value")).toBe("true");
    expect(wrapper.last().prop("value")).toBe("false");
  });

  it("should render a 'summary of current unresolved declarations' textarea when 'yes' radio for flagging current Significant Events, Complaints, Other investigations is true ", () => {
    const component = mount(<Section5 {...props} />);
    const wrapper = component.find(
      "[data-jest='haveCurrentDeclarations'] input"
    );
    wrapper.first().simulate("click");
    expect(
      component.find("[data-jest='currentDeclarationsSummaryTextInput']")
    ).toBeTruthy();
  });

  it("should render previous section link buttons", () => {
    const wrapper = mount(<Section5 {...props} />);
    expect(wrapper.find("a[data-jest='BacklinkToSection4']").length).toBe(1);
    wrapper.find("a[data-jest='BacklinkToSection4']").first().simulate("click");
    expect(prevSection).toHaveBeenCalled();
  });

  it("should render 'continue to submit' link", () => {
    const wrapper = mount(<Section5 {...props} />);
    expect(wrapper.find("a[data-jest='linkToSubmit']").length).toBe(1);
  });

  it("should call onClick when click on 'true' radio", async () => {
    const component = mount(<Section5 {...props} />);
    const wrapper = component.find(
      "[data-jest='haveCurrentDeclarations'] input"
    );
    wrapper.first().simulate("click");
  });
});
