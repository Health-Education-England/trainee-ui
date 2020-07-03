import {
  LOAD_FORMR_PARTB,
  LOAD_FORMR_PARTB_LIST_SUCCESS,
  LOAD_FORMR_PARTB_LIST_FAILURE,
  INITIALIZE_FORMR_PARTB_FAILURE,
  INITIALIZE_FORMR_PARTB_SUCCESS,
  MOVE_TO_SECTION,
  EDIT_FORMR_PARTB,
  SAVE_FORMR_PARTB_SUCCESS,
  SAVE_FORMR_PARTB_FAILURE
} from "../action_types";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { submittedFormRPartBs } from "../../mock-data/submitted-formr-partb";
import {
  loadForm,
  loadFormRPartBList,
  initializeForm,
  moveToSection,
  editForm,
  saveForm
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
  store = mockStore({
    formrPartb: { formData: null, section: 1 }
  });
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
      .spyOn(formsService, "getTraineeFormRPartBList")
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
      .spyOn(formsService, "getTraineeFormRPartBList")
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

describe("initializeForm method", () => {
  it("should dispatch INITIALIZE_FORMR_PARTB_SUCCESS if trainee profile is received", () => {
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
      type: INITIALIZE_FORMR_PARTB_SUCCESS,
      payload: ProfileToFormRPartBInitialValues(mockTraineeProfile)
    };

    return store.dispatch(initializeForm(traineeProfileService)).then(() => {
      expect(store.getActions()).toContainEqual(expectedAction);
    });
  });

  it("should dispatch INITIALIZE_FORMR_PARTB_FAILURE if trainee profile call fails", () => {
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
      type: INITIALIZE_FORMR_PARTB_FAILURE,
      payload: errorResponse
    };

    return store.dispatch(initializeForm(traineeProfileService)).then(() => {
      expect(store.getActions()).toContainEqual(expectedAction);
    });
  });
});

describe("loadForm method", () => {
  it("should dispatch LOAD_FORMR_PARTB if data is not null", () => {
    const formrPartb = submittedFormRPartBs[0];
    const expectedActions = {
      type: LOAD_FORMR_PARTB,
      payload: formrPartb
    };

    return expect(store.dispatch(loadForm(formrPartb))).toEqual(
      expectedActions
    );
  });
});

describe("moveToSection method", () => {
  it("should dispatch FORMR_PARTB_MOVE_TO_SECTION with section passed", () => {
    const sectionNumber = 3;
    const expectedActions = {
      type: MOVE_TO_SECTION,
      payload: 3
    };

    return expect(store.dispatch(moveToSection(sectionNumber))).toEqual(
      expectedActions
    );
  });
});

describe("editForm", () => {
  it("should dispatch EDIT_FORMR_PARTB with section and formData passed", () => {
    const formrPartb = submittedFormRPartBs[0];
    const sectionNumber = 3;
    const expectedActions = {
      type: EDIT_FORMR_PARTB,
      payload: { formData: formrPartb, section: sectionNumber }
    };

    return expect(store.dispatch(editForm(formrPartb, sectionNumber))).toEqual(
      expectedActions
    );
  });
});

describe("saveForm", () => {
  it("should dispatch SAVE_FORMR_PARTB_SUCCESS when form is posted successfully", () => {
    const formrPartb = submittedFormRPartBs[0];

    const successResponse: Promise<AxiosResponse<FormRPartB>> = Promise.resolve(
      {
        data: formrPartb,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {}
      }
    );

    jest
      .spyOn(formsService, "saveTraineeFormRPartB")
      .mockReturnValue(successResponse);

    const expectedAction = {
      type: SAVE_FORMR_PARTB_SUCCESS,
      payload: formrPartb
    };

    return store.dispatch(saveForm(formsService, formrPartb)).then(() => {
      expect(store.getActions()).toContainEqual(expectedAction);
    });
  });

  it("should dispatch SAVE_FORMR_PARTB_FAILURE when form couddn't posted", () => {
    const errorResponse = {
      data: null,
      status: 500,
      statusText: "Internal server error",
      headers: {},
      config: {}
    };

    jest
      .spyOn(formsService, "saveTraineeFormRPartB")
      .mockReturnValue(Promise.reject(errorResponse));

    const expectedAction = {
      type: SAVE_FORMR_PARTB_FAILURE,
      payload: errorResponse
    };

    return store
      .dispatch(saveForm(formsService, submittedFormRPartBs[0]))
      .then(() => {
        expect(store.getActions()).toContainEqual(expectedAction);
      });
  });
});
