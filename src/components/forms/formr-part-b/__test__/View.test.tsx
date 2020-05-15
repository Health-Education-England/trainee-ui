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

describe("View", () => {
  const mountComponent = (form: FormRPartB | null, history: any) => {
    const store = mockStore({
      formRPartBView: {
        formData: form
      }
    });

    return mount(
      <Provider store={store}>
        <View history={history} />
      </Provider>
    );
  };

  it("renders without crashing", () => {
    mountComponent(submittedFormRPartBs[0], []);
  });

  it("should push /formr-b to history when form data is null", () => {
    const history: any[] = [];
    mountComponent(null, history);

    expect(history[0]).toEqual("/formr-b");
  });

  it("should load data when form data is not null", () => {
    const history: any[] = [];
    const wrapper = mountComponent(submittedFormRPartBs[0], history);

    expect(history).toHaveLength(0);
    expect(wrapper.find("a")).toHaveLength(1);
  });
});
