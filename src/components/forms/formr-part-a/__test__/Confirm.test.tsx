import React from "react";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import Confirm from "../Confirm";
import { Provider } from "react-redux";
import { FormRPartA } from "../../../../models/FormRPartA";
import { submittedForms } from "../../../../mock-data/submitted-formr-parta";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Confirm", () => {
  const mountComponent = (form: FormRPartA | null, history: any) => {
    const store = mockStore({
      formRPartAView: {
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
    mountComponent(submittedForms[0], null);
  });

  it("should push 'formr-a/create' page to history when form data not available", () => {
    const history: any[] = [];
    mountComponent(null, history);

    expect(history[0]).toEqual("/formr-a/create");
  });

  it("renders the edit and confirm buttons when form data is avaialbe", () => {
    const wrapper = mountComponent(submittedForms[0], null);

    expect(wrapper.find("button")).toHaveLength(2);
  });

  it("should push 'formr-a/create' along with formData page to history when edit button clicked", () => {
    const history: any[] = [];
    const wrapper = mountComponent(submittedForms[0], history);

    const editButton = wrapper.find("button").first();
    editButton.simulate("click");

    expect(history[0].pathname).toEqual("/formr-a/create");
    expect(history[0].formData).toEqual(submittedForms[0]);
  });

  it("should invoke saveTraineeFormRPartA with form data when submit button clicked", () => {
    const history: any[] = [];
    const wrapper = mountComponent(submittedForms[0], history);

    const submitButton = wrapper.find("button").last();
    submitButton.simulate("click");
  });
});
