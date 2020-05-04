import React from "react";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import Confirm from "../Confirm";
import { Provider } from "react-redux";
import { FormRPartB } from "../../../../models/FormRPartB";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Confirm", () => {
  const mountComponent = (form: FormRPartB | null, history: any) => {
    const store = mockStore({
      formRPartBView: {
        formData: form
      }
    });

    return mount(
      <Provider store={store}>
        <Confirm history={history} />
      </Provider>
    );
  };

  it("renders without crashing", () => {
    mountComponent(submittedFormRPartBs[0], null);
  });

  it("should push 'formr-b/create' page to history when form data not available", () => {
    const history: any[] = [];
    mountComponent(null, history);

    expect(history[0]).toEqual("/formr-b/create");
  });

  it("renders the edit and confirm buttons when form data is avaialbe", () => {
    const wrapper = mountComponent(submittedFormRPartBs[0], null);

    expect(wrapper.find("button")).toHaveLength(2);
  });

  it("should push 'formr-b/create' along with formData page to history when edit button clicked", () => {
    const history: any[] = [];
    const wrapper = mountComponent(submittedFormRPartBs[0], history);

    const editButton = wrapper.find("button").first();
    editButton.simulate("click");

    expect(history[0].pathname).toEqual("/formr-b/create");
    expect(history[0].formData).toEqual(submittedFormRPartBs[0]);
  });

  it("should invoke saveTraineeFormRPartB with form data when submit button clicked", () => {
    const history: any[] = [];
    const wrapper = mountComponent(submittedFormRPartBs[0], history);

    const submitButton = wrapper.find("button").last();
    submitButton.simulate("click");
  });
});
