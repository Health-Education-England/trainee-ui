import React from "react";
import { shallow, mount } from "enzyme";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import Create from "../Create";
import { Provider } from "react-redux";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";
import { FormRPartB } from "../../../../models/FormRPartB";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history: any[] = [];
const location: any[] = [];

const createStore = (form: FormRPartB | null, section: number = 1) =>
  mockStore({
    newFormRPartB: { formData: form, section: section },
    referenceData: {
      localOffices: [{ label: "localOffice", value: "localOffice" }],
      curricula: [{ label: "curriculum", value: "curriculum" }],
      isLoaded: true
    }
  });

let store = createStore(submittedFormRPartBs[0]);

describe("Create", () => {
  it("renders without crashing", () => {
    shallow(
      <Provider store={store}>
        <Create history={history} location={location} />
      </Provider>
    );
  });

  it("renders section 1 when section value is 1", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Create history={history} location={location} />
      </Provider>
    );

    expect(wrapper.find("legend.nhsuk-fieldset__legend").text()).toBe(
      "Section 1: Doctor's details"
    );
  });

  it("render section 2 when section value is 2", () => {
    const stores = createStore(submittedFormRPartBs[0], 2);

    const wrapper = mount(
      <Provider store={stores}>
        <Create history={history} location={location} />
      </Provider>
    );

    expect(wrapper.find("legend.nhsuk-fieldset__legend").text()).toBe(
      "Section 2: Whole Scope of Practice"
    );
  });

  it("render loading when section value is not valid", () => {
    const stores = createStore(submittedFormRPartBs[0], 0);

    const wrapper = mount(
      <Provider store={stores}>
        <Create history={history} location={location} />
      </Provider>
    );

    expect(wrapper.find("[data-jest='loading']").length).toBe(1);
  });

  it("should load Loading when reference data is not loaded", () => {
    store = mockStore({
      newFormRPartB: { formData: submittedFormRPartBs[0], section: 1 },
      referenceData: {
        localOffices: [],
        curricula: [],
        isLoaded: false
      }
    });

    const wrapper = mount(
      <Provider store={store}>
        <Create history={history} location={location} />
      </Provider>
    );

    expect(wrapper.find("[data-jest='loading']").length).toBe(1);
  });
});
