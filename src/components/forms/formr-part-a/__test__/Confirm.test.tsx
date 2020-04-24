import React from "react";
import { shallow } from "enzyme";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import Confirm from "../Confirm";
import { Provider } from "react-redux";

const history: never[] = [];
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  formRPartAView: {
    formData: null
  }
});

describe("Confirm", () => {
  it("renders without crashing", () => {
    shallow(
      <Provider store={store}>
        <Confirm history={history} />
      </Provider>
    );
  });
});
