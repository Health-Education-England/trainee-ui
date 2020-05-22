import React from "react";
import App from "./App";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("App", () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });

  it("mounts without crashing", () => {
    const store = mockStore({});

    mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
