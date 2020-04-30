import {
  LOAD_FORMR_PARTB_SUCCESS,
  LOAD_FORMR_PARTB_FAILURE
} from "../action_types";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { submittedFormRPartBs } from "../../mock-data/submitted-formr-partb";
import { loadFormRPartB } from "../actions/formr-partb-actions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store = mockStore({});

// describe("loadFormRPartBList method", () => {
//   it("Should dispatch LOAD_FORMR_PARTB_LIST_SUCCESS on successfull api call", () => {
//     const responsedata = submittedFormRPartBs;

//     const successResponse: Promise<AxiosResponse<
//       FormRPartB[]
//     >> = Promise.resolve({
//       data: responsedata,
//       status: 200,
//       statusText: "OK",
//       headers: {},
//       config: {}
//     });

//     jest
//       .spyOn(formsService, "getTraineeFormRPartB")
//       .mockReturnValue(successResponse);

//     const expectedActions = [
//       {
//         type: LOAD_FORMR_PARTB_LIST_SUCCESS,
//         payload: responsedata
//       }
//     ];

//     return store.dispatch(loadFormRPartBList(formsService)).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });

//   it("Should dispatch LOAD_FORMR_PARTB_LIST_FAILURE if api call fails", () => {
//     store = mockStore({});

//     const errorResponse = {
//       data: null,
//       status: 500,
//       statusText: "Internal server error",
//       headers: {},
//       config: {}
//     };

//     jest
//       .spyOn(formsService, "getTraineeFormRPartB")
//       .mockReturnValue(Promise.reject(errorResponse));

//     const expectedActions = [
//       {
//         type: LOAD_FORMR_PARTB_LIST_FAILURE,
//         payload: errorResponse
//       }
//     ];

//     return store.dispatch(loadFormRPartBList(formsService)).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
// });

describe("loadFormRPartB method", () => {
  it("should dispatch LOAD_FORMR_PARTB_SUCCESS if data is not null", () => {
    const formrParta = submittedFormRPartBs[0];
    const expectedActions = {
      type: LOAD_FORMR_PARTB_SUCCESS,
      payload: formrParta
    };

    return expect(store.dispatch(loadFormRPartB(formrParta))).toEqual(
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
