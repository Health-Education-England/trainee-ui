import React from "react";
import { mount } from "enzyme";
import View from "../View";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";
import { Provider } from "react-redux";
import { FormRPartB } from "../../../../models/FormRPartB";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mountComponent = (
  form: FormRPartB | null,
  history: any,
  canEdit: boolean
) => {
  const store = mockStore({
    formRPartBView: {
      formData: form
    }
  });

  return mount(
    <Provider store={store}>
      <View canEdit={canEdit} history={history} />
    </Provider>
  );
};

describe("View", () => {
  it("renders without crashing", () => {
    mountComponent(submittedFormRPartBs[0], [], false);
  });

  it("should push /formr-b to history when form data is null", () => {
    const history: any[] = [];
    mountComponent(null, history, false);

    expect(history[0]).toEqual("/formr-b");
  });

  it("should load data when form data is not null", () => {
    const wrapper = mountComponent(submittedFormRPartBs[0], [], false);

    expect(wrapper.find("a")).toHaveLength(1);
    expect(wrapper.find("button.sectionEditButton").length).toBe(0);
  });

  it("should render date fields in local date format", () => {
    const wrapper = mountComponent(submittedFormRPartBs[0], [], false);
    expect(wrapper.find("[data-jest='currRevalDate']").first().text()).toBe(
      "22/04/2020"
    );
    expect(wrapper.find("[data-jest='prevRevalDate']").first().text()).toBe(
      "22/04/2020"
    );
    expect(wrapper.find("[data-jest='startDate']").first().text()).toBe(
      "01/01/2020"
    );
    expect(wrapper.find("[data-jest='endDate']").first().text()).toBe(
      "31/12/2020"
    );
  });

  it("should show date fields value empty when undefined", () => {
    const work = submittedFormRPartBs[0].work[0];
    const formData = {
      ...submittedFormRPartBs[0],
      currRevalDate: undefined,
      prevRevalDate: undefined,
      work: [
        {
          ...work,
          startDate: undefined,
          endDate: undefined
        }
      ]
    };

    const wrapper = mountComponent(formData, [], false);

    expect(wrapper.find("[data-jest='currRevalDate']").first().text()).toBe("");
    expect(wrapper.find("[data-jest='prevRevalDate']").first().text()).toBe("");
    expect(wrapper.find("[data-jest='startDate']").first().text()).toBe("");
    expect(wrapper.find("[data-jest='endDate']").first().text()).toBe("");
  });

  it("should not add any work panels if no items found", () => {
    const formData = { ...submittedFormRPartBs[0], work: [] };
    const wrapper = mountComponent(formData, [], false);

    expect(wrapper.find("div.workPanel").length).toBe(0);
  });

  it("should not load Edit buttons when canEdit is false", () => {
    const wrapper = mountComponent(submittedFormRPartBs[0], [], true);

    expect(wrapper.find("button.sectionEditButton").length).toBeGreaterThan(0);
  });

  it("should load Edit buttons when canEdit is true", () => {
    const wrapper = mountComponent(submittedFormRPartBs[0], [], true);

    expect(wrapper.find("button.sectionEditButton").length).toBeGreaterThan(0);
  });
});
