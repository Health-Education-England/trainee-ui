import {
  LOAD_FORMR_PARTB_SUCCESS,
  LOAD_FORMR_PARTB_FAILURE,
  LOAD_FORMR_PARTB_LIST_SUCCESS,
  LOAD_FORMR_PARTB_LIST_FAILURE,
  LOAD_FORMR_PARTB_INITIAL_VALUES_SUCCESS,
  LOAD_FORMR_PARTB_INITIAL_VALUES_FAILURE,
  FORMR_PARTB_MOVE_TO_SECTION
} from "../action_types";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { submittedFormRPartBs } from "../../mock-data/submitted-formr-partb";
import {
  loadFormRPartB,
  loadFormRPartBList,
  loadFormRPartBInitialValues,
  moveToSection
} from "../actions/formr-partb-actions";
import { FormRPartB } from "../../models/FormRPartB";
import { AxiosResponse } from "axios";
import { FormsService } from "../../services/FormsService";
import { TraineeProfileService } from "../../services/TraineeProfileService";
import { TraineeProfile } from "../../models/TraineeProfile";
import { mockTraineeProfile } from "../../mock-data/trainee-profile";
import { ProfileToFormRPartBInitialValues } from "../../models/ProfileToFormRPartBInitialValues";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const formsService = new FormsService();
const traineeProfileService = new TraineeProfileService();
let store = null;

beforeEach(() => {
  store = mockStore({});
});

describe("loadFormRPartBList method", () => {
  it("Should dispatch LOAD_FORMR_PARTB_LIST_SUCCESS on successfull api call", () => {
    const responsedata = submittedFormRPartBs;

    const successResponse: Promise<AxiosResponse<
      FormRPartB[]
    >> = Promise.resolve({
      data: responsedata,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {}
    });

    jest
      .spyOn(formsService, "getTraineeFormRPartB")
      .mockReturnValue(successResponse);

    const expectedActions = [
      {
        type: LOAD_FORMR_PARTB_LIST_SUCCESS,
        payload: responsedata
      }
    ];

    return store.dispatch(loadFormRPartBList(formsService)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Should dispatch LOAD_FORMR_PARTB_LIST_FAILURE if api call fails", () => {
    const errorResponse = {
      data: null,
      status: 500,
      statusText: "Internal server error",
      headers: {},
      config: {}
    };

    jest
      .spyOn(formsService, "getTraineeFormRPartB")
      .mockReturnValue(Promise.reject(errorResponse));

    const expectedActions = [
      {
        type: LOAD_FORMR_PARTB_LIST_FAILURE,
        payload: errorResponse
      }
    ];

    return store.dispatch(loadFormRPartBList(formsService)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("loadFormRPartB method", () => {
  it("should dispatch LOAD_FORMR_PARTB_SUCCESS if data is not null", () => {
    const formrPartb = submittedFormRPartBs[0];
    const expectedActions = {
      type: LOAD_FORMR_PARTB_SUCCESS,
      payload: formrPartb
    };

    return expect(store.dispatch(loadFormRPartB(formrPartb))).toEqual(
      expectedActions
    );
  });

  it("should dispatch LOAD_FORMR_PARTB_FAILURE if data is null", () => {
    const expectedActions = {
      type: LOAD_FORMR_PARTB_FAILURE,
      payload: null
    };

    return expect(store.dispatch(loadFormRPartB(null))).toEqual(
      expectedActions
    );
  });
});

describe("loadFormRPartBInitialValues method", () => {
  it("should dispatch LOAD_FORMR_PARTB_INITIAL_VALUES_SUCCESS if trainee profile is received", () => {
    const successResponse: Promise<AxiosResponse<
      TraineeProfile
    >> = Promise.resolve({
      data: mockTraineeProfile,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {}
    });

    jest
      .spyOn(traineeProfileService, "getTraineeProfile")
      .mockReturnValue(successResponse);

    const expectedAction = {
      type: LOAD_FORMR_PARTB_INITIAL_VALUES_SUCCESS,
      payload: ProfileToFormRPartBInitialValues(mockTraineeProfile)
    };

    return store
      .dispatch(loadFormRPartBInitialValues(traineeProfileService))
      .then(() => {
        expect(store.getActions()).toContainEqual(expectedAction);
      });
  });

  it("should dispatch LOAD_FORMR_PARTB_INITIAL_VALUES_FAILURE if trainee profile call fails", () => {
    const errorResponse = {
      data: null,
      status: 500,
      statusText: "Internal server error",
      headers: {},
      config: {}
    };

    jest
      .spyOn(traineeProfileService, "getTraineeProfile")
      .mockReturnValue(Promise.reject(errorResponse));

    const expectedAction = {
      type: LOAD_FORMR_PARTB_INITIAL_VALUES_FAILURE,
      payload: errorResponse
    };

    return store
      .dispatch(loadFormRPartBInitialValues(traineeProfileService))
      .then(() => {
        expect(store.getActions()).toContainEqual(expectedAction);
      });
  });
});

describe("moveToSection method", () => {
  it("should dispatch FORMR_PARTB_MOVE_TO_SECTION with section 1 when no section passed", () => {
    const formData = submittedFormRPartBs[0];
    const expectedActions = {
      type: FORMR_PARTB_MOVE_TO_SECTION,
      payload: { formData, section: 1 }
    };

    return expect(store.dispatch(moveToSection(formData))).toEqual(
      expectedActions
    );
  });

  it("should dispatch FORMR_PARTB_MOVE_TO_SECTION with section passed", () => {
    const sectionNumber = 3;
    const formData = submittedFormRPartBs[0];
    const expectedActions = {
      type: FORMR_PARTB_MOVE_TO_SECTION,
      payload: { formData, section: sectionNumber }
    };

    return expect(
      store.dispatch(moveToSection(formData, sectionNumber))
    ).toEqual(expectedActions);
  });
});
