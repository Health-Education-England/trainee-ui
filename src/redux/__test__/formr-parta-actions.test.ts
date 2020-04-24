import {
  LOAD_FORMR_PARTA_LIST_SUCCESS,
  LOAD_FORMR_PARTA_LIST_FAILURE,
  LOAD_FORMR_PARTA_SUCCESS,
  LOAD_FORMR_PARTA_FAILURE
} from "../action_types";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { AxiosResponse } from "axios";
import { FormRPartAService } from "../../services/FormRPartAService";
import { submittedForms } from "../../mock-data/submitted-formr-parta";

import {
  loadFormRPartAList,
  loadFormRPartA
} from "../actions/formr-parta-actions";
import { FormRPartA } from "../../models/FormRPartA";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const formRPartAService = new FormRPartAService();
const store = mockStore({});

describe("loadFormRPartAList method", () => {
  it("Should dispatch LOAD_FORMR_PARTA_LIST_SUCCESS on successfull api call", () => {
    const responsedata = submittedForms;

    const successResponse: Promise<AxiosResponse<
      FormRPartA[]
    >> = Promise.resolve({
      data: responsedata,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {}
    });

    jest
      .spyOn(formRPartAService, "getTraineeFormRPartA")
      .mockReturnValue(successResponse);

    const expectedActions = [
      {
        type: LOAD_FORMR_PARTA_LIST_SUCCESS,
        payload: responsedata
      }
    ];

    return store.dispatch(loadFormRPartAList(formRPartAService)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Should dispatch LOAD_FORMR_PARTA_LIST_FAILURE if api call fails", () => {
    const store = mockStore({});

    const errorResponse = {
      data: null,
      status: 500,
      statusText: "Internal server error",
      headers: {},
      config: {}
    };

    jest
      .spyOn(formRPartAService, "getTraineeFormRPartA")
      .mockReturnValue(Promise.reject(errorResponse));

    const expectedActions = [
      {
        type: LOAD_FORMR_PARTA_LIST_FAILURE,
        payload: errorResponse
      }
    ];

    return store.dispatch(loadFormRPartAList(formRPartAService)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("loadFormRPartA method", () => {
  it("should dispatch LOAD_FORMR_PARTA_SUCCESS if data is not null", () => {
    const formrParta = submittedForms[0];
    const expectedActions = {
      type: LOAD_FORMR_PARTA_SUCCESS,
      payload: formrParta
    };

    return expect(store.dispatch(loadFormRPartA(formrParta))).toEqual(
      expectedActions
    );
  });
  it("should dispatch LOAD_FORMR_PARTA_FAILURE if data is null", () => {
    const expectedActions = {
      type: LOAD_FORMR_PARTA_FAILURE,
      payload: null
    };

    return expect(store.dispatch(loadFormRPartA(null))).toEqual(
      expectedActions
    );
  });
});
