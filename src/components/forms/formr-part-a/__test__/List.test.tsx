import React from "react";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import List from "../List";

import { submittedFormRPartAs } from "../../../../mock-data/submitted-formr-parta";
import { LifeCycleState } from "../../../../models/LifeCycleState";
import { FormRPartA } from "../../../../models/FormRPartA";

import { Provider } from "react-redux";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("List", () => {
  const mountComponent = (forms: FormRPartA[], history: any) => {
    const store = mockStore({
      formRPartAList: {
        submittedForms: forms,
        isLoading: false
      }
    });

    return mount(
      <Provider store={store}>
        <List history={history} />
      </Provider>
    );
  };

  it("should have button with label Submit new form when forms list contains just submitted forms", () => {
    const history: any[] = [];
    const wrapper = mountComponent(
      submittedFormRPartAs.filter(
        form => form.lifecycleState === LifeCycleState.Submitted
      ),
      history
    );
    const newFormButton = wrapper.find("button");
    expect(newFormButton.html()).toContain("Submit new form");
    newFormButton.simulate("click");
  });

  it("should show button with label Edit saved form when forms list contains a draft form", () => {
    const history: any[] = [];
    const wrapper = mountComponent(
      submittedFormRPartAs.filter(
        form =>
          form.lifecycleState === LifeCycleState.Draft ||
          form.lifecycleState === LifeCycleState.Submitted
      ),
      history
    );
    const newFormButton = wrapper.find("button");

    expect(newFormButton.html()).toContain("Edit saved form");

    newFormButton.simulate("click");
  });

  it("should show button with label Edit unsubmitted form when forms list contains an unsubmitted form", () => {
    const history: any[] = [];
    const wrapper = mountComponent(submittedFormRPartAs, history);
    const newFormButton = wrapper.find("button");

    expect(newFormButton.html()).toContain("Edit unsubmitted form");

    newFormButton.simulate("click");
  });

  it("renders 'No forms submitted yet' label without table when submitted forms not available", () => {
    const wrapper = mountComponent([], null);

    expect(wrapper.find("table")).toHaveLength(0);
    expect(wrapper.html()).toContain("No forms submitted yet");
  });

  it("renders submitted forms list in a table when submitted forms available", () => {
    const history: any[] = [];
    const wrapper = mountComponent(submittedFormRPartAs, history);
    expect(wrapper.find("table")).toHaveLength(1);
    const rows = wrapper.find("tr");
    expect(rows).toHaveLength(2);
    expect(wrapper.find("tr").find("td")).toHaveLength(2);

    const linkElement = rows.last().find("a");
    linkElement.simulate("click");
  });
});
