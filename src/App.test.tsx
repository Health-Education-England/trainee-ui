import React from "react";
import App from "./App";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import Login from "./components/authentication/Login";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let wrapper;

beforeEach(() => {
  const store = mockStore({});

  wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
});

describe("App", () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });

  it("should load login page by default", () => {
    expect(wrapper.find(Login)).toHaveLength(1);
  });

  it("should set isAuthenticated to true, when signedIn state received", async () => {
    wrapper.find(App).find(Login).props().setAuthenticationStatus("signedIn");

    expect(wrapper.find(App).state("isAuthenticated")).toBe(true);
  });

  it("should set isAuthenticated to false, when state received is not signedIn ", async () => {
    wrapper.find(App).find(Login).props().setAuthenticationStatus("signedOut");

    expect(wrapper.find(App).state("isAuthenticated")).toBe(false);
  });
});
