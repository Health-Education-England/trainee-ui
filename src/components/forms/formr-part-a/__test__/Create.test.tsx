import React from "react";
import { shallow, mount } from "enzyme";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import Create from "../Create";
import { Provider } from "react-redux";
import { mockTraineeProfile } from "../../../../mock-data/trainee-profile";
import { TraineeProfile } from "../../../../models/TraineeProfile";

const history: any[] = [];
const location: any[] = [];
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const createStore = (profile: TraineeProfile | null) =>
  mockStore({
    profile: {
      traineeProfile: profile,
      isLoaded: profile != null
    },
    referenceData: {
      genders: [{ label: "gender", value: "gender" }],
      colleges: [{ label: "college", value: "college" }],
      localOffices: [{ label: "localOffice", value: "localOffice" }],
      curricula: [{ label: "curriculum", value: "curriculum" }],
      qualifications: [{ label: "qualification", value: "qualification" }],
      grades: [{ label: "grade", value: "grade" }],
      immigrationStatus: [
        { label: "immigrationStatus", value: "immigrationStatus" },
        { label: "Other", value: "Other" }
      ],
      isLoaded: true
    }
  });

let store = createStore(mockTraineeProfile);

describe("Create", () => {
  it("renders without crashing", () => {
    shallow(
      <Provider store={store}>
        <Create history={history} location={location} />
      </Provider>
    );
  });

  it("mounts without crashing", () => {
    mount(
      <Provider store={store}>
        <Create history={history} location={location} />
      </Provider>
    );
  });

  it("should enable specialty for award of CCT fields for CCT declaration type selection", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Create history={history} location={location} />
      </Provider>
    );

    expect(wrapper.find("div[name='declarationType']").length).toBe(1);
  });

  it("should load Loading when reference data is not loaded", () => {
    store = createStore(null);

    const wrapper = mount(
      <Provider store={store}>
        <Create history={history} location={location} />
      </Provider>
    );

    expect(wrapper.find("[data-jest='loading']").length).toBe(1);
  });
});
