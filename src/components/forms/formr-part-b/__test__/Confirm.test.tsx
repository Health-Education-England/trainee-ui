import React from "react";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import Confirm from "../Confirm";
import { Provider } from "react-redux";
import { FormRPartB } from "../../../../models/FormRPartB";
import { submittedFormRPartBs } from "../../../../mock-data/submitted-formr-partb";
import { act } from "react-test-renderer";

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

    expect(wrapper.find("button")).toHaveLength(4);
  });

  it("should push 'formr-b/create' along with formData page to history when edit button clicked", () => {
    const history: any[] = [];
    const wrapper = mountComponent(submittedFormRPartBs[0], history);

    const editButton = wrapper.find("button").first();
    act(() => {
      editButton.simulate("click");
    });
  });

  it("should invoke saveTraineeFormRPartB with form data when submit button clicked", () => {
    const history: any[] = [];
    const wrapper = mountComponent(submittedFormRPartBs[0], history);

    const submitButton = wrapper.find("button").last();

    act(() => {
      submitButton.simulate("click");
    });
  });
});
