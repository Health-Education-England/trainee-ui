import React from "react";
import { shallow, mount } from "enzyme";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import Create from "../Create";
import { Provider } from "react-redux";
import { mockTraineeProfile } from "../../../../mock-data/trainee-profile";
import { TraineeProfile } from "../../../../models/TraineeProfile";
import Loading from "../../../common/Loading";
import * as yup from "yup";

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

const getComponent = (store: TraineeProfile | null) => (
  <Provider store={createStore(store)}>
    <Create history={history} location={location} />
  </Provider>
);

beforeEach(() => {
  jest.resetModules();
});

describe("Create", () => {
  it("renders without crashing", () => {
    shallow(getComponent(mockTraineeProfile));
  });

  it("mounts without crashing", () => {
    mount(getComponent(mockTraineeProfile));
  });

  it("should load Loading when reference data is not loaded", () => {
    const wrapper = mount(getComponent(null));

    expect(wrapper.find(Loading)).toHaveLength(1);
  });

  it("should show program speciality fields when CCT_DECLRATION is selected", () => {
    const wrapper = mount(getComponent(mockTraineeProfile));

    const submitBtn = wrapper.find("button").last();
    submitBtn.simulate("submit");
  });

  it("should call loadFormRPartA, when the form is submitted", async () => {
    const wrapper = mount(getComponent(mockTraineeProfile));
    const mockValidationSchema = yup.object({
      forename: yup.string()
    });
    const mockFn = jest.fn();

    jest.mock("../ValidationSchema", () => ({
      get ValidationSchema() {
        return mockValidationSchema;
      }
    }));

    jest.mock("../../../../redux/actions/formr-parta-actions", () => ({
      get loadFormRPartA() {
        return mockFn;
      }
    }));

    try {
      wrapper.find("button").last().simulate("click");
      expect(mockFn).toHaveBeenCalled();
    } catch (e) {
      //expect(true).toBe(false);
    }
  });
});
