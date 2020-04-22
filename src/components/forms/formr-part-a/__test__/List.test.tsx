import React from "react";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import List from "../List";
import { submittedForms } from "../../../../mock-data/submitted-formr-parta";
import { FormRPartA } from "../../../../models/FormRPartA";
import { Provider } from "react-redux";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("List", () => {
  const mountComponent = (forms: FormRPartA[], history: any) => {
    const store = mockStore({
      formRPartAList: {
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
    expect(history[0].pathname).toEqual("/formr-a/create");
  });

  it("renders No forms found label without table", () => {
    const wrapper = mountComponent([], null);

    expect(wrapper.find("table")).toHaveLength(0);
    expect(wrapper.html()).toContain("No forms found");
  });

  it("renders submitted forms list in a table", () => {
    const history: any[] = [];
    const wrapper = mountComponent(submittedForms, history);

    expect(wrapper.find("table")).toHaveLength(1);

    const rows = wrapper.find("tr");
    expect(rows).toHaveLength(2);
    expect(wrapper.find("tr").find("td")).toHaveLength(2);

    const linkElement = rows.last().find("a");
    linkElement.simulate("click");
    expect(history[0]).toEqual(`/formr-a/${submittedForms[0].id}`);
  });
});
