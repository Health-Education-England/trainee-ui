import React from "react";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import List from "../List";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";
import { FormRPartB } from "../../../../models/FormRPartB";
import { Provider } from "react-redux";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("List", () => {
  const mountComponent = (forms: FormRPartB[], history: any) => {
    const store = mockStore({
      formRPartBList: {
        submittedForms: forms
      }
    });

    return mount(
      <Provider store={store}>
        <List history={history} />
      </Provider>
    );
  };

  it("should have button with label Submit new form", () => {
    const history: any[] = [];
    const wrapper = mountComponent([], history);
    const newFormButton = wrapper.find("button");

    expect(newFormButton.html()).toContain("Submit new form");

    newFormButton.simulate("click");
    expect(history[0].pathname).toEqual("/formr-b/create");
  });

  it("renders 'No forms found label' without table when submitted forms not available", () => {
    const wrapper = mountComponent([], null);

    expect(wrapper.find("table")).toHaveLength(0);
    expect(wrapper.html()).toContain("No forms found");
  });

  it("renders submitted forms list in a table when submitted forms available", () => {
    const history: any[] = [];
    const wrapper = mountComponent(submittedFormRPartBs, history);

    expect(wrapper.find("table")).toHaveLength(1);

    const rows = wrapper.find("tr");
    expect(rows).toHaveLength(2);
    expect(wrapper.find("tr").find("td")).toHaveLength(2);

    const linkElement = rows.last().find("a");
    linkElement.simulate("click");
    expect(history[0]).toEqual(`/formr-b/${submittedFormRPartBs[0].id}`);
  });
});
