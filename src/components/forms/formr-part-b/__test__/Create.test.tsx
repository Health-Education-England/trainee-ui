import React from "react";
import { shallow } from "enzyme";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import Create from "../Create";
import { Provider } from "react-redux";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store = mockStore({
  profile: {
    traineeProfile: null,
    isLoaded: true
  },
  referenceData: {
    genders: [],
    colleges: [],
    localOffices: [],
    qualifications: [],
    grades: [],
    immigrationStatus: [],
    curricula: [],
    isLoaded: false
  }
});

describe("Create", () => {
  it("renders without crashing", () => {
    const history: any[] = [];
    const location: any[] = [];
    shallow(
      <Provider store={store}>
        <Create history={history} location={location} />
      </Provider>
    );
  });
});
