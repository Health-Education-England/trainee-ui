import { ActionType, FormRPartBViewState, FormRPartBListState } from "../types";
import {
  LOAD_FORMR_PARTB_SUCCESS,
  LOAD_FORMR_PARTB_FAILURE,
  LOAD_FORMR_PARTB_LIST_SUCCESS,
  LOAD_FORMR_PARTB_LIST_FAILURE
} from "../action_types";
import {
  LoadFormRPartBReducer,
  LoadFormRPartBListReducer
} from "../reducers/formr-partb-reducer";

describe("Load form-r part-a reducer", () => {
  const initialState: FormRPartBViewState = {
    formData: null
  };

  it("should return initial state when no action passed", () => {
    const defaultAction: ActionType = {
      type: "",
      payload: null
    };

    expect(LoadFormRPartBReducer(undefined, defaultAction)).toEqual(
      initialState
    );
  });

  it("should return updated state when LOAD_FORMR_PARTB_SUCCESS action passed", () => {
    const state: FormRPartBViewState = {
      ...initialState,
      formData: null
    };

    const successAction: ActionType = {
      type: LOAD_FORMR_PARTB_SUCCESS,
      payload: null
    };

    expect(LoadFormRPartBReducer(initialState, successAction)).toEqual(state);
  });

  it("should return updated state when LOAD_FORMR_PARTB_FAILURE action passed", () => {
    const state: FormRPartBViewState = {
      ...initialState
    };

    const failureAction: ActionType = {
      type: LOAD_FORMR_PARTB_FAILURE,
      payload: null
    };

    expect(LoadFormRPartBReducer(initialState, failureAction)).toEqual(state);
  });
});

describe("Load form-r part-a list reducer", () => {
  const initialState: FormRPartBListState = {
    submittedForms: []
  };

  it("should return initial state when no action passed", () => {
    const defaultAction: ActionType = {
      type: "",
      payload: null
    };

    expect(LoadFormRPartBListReducer(undefined, defaultAction)).toEqual(
      initialState
    );
  });

  it("should return updated state when LOAD_FORMR_PARTB_LIST_SUCCESS action passed", () => {
    const state: FormRPartBListState = {
      ...initialState,
      submittedForms: []
    };

    const successAction: ActionType = {
      type: LOAD_FORMR_PARTB_LIST_SUCCESS,
      payload: []
    };

    expect(LoadFormRPartBListReducer(initialState, successAction)).toEqual(
      state
    );
  });

  it("should return updated state when LOAD_FORMR_PARTB_LIST_FAILURE action passed", () => {
    const state: FormRPartBListState = {
      ...initialState
    };

    const failureAction: ActionType = {
      type: LOAD_FORMR_PARTB_LIST_FAILURE,
      payload: null
    };

    expect(LoadFormRPartBListReducer(initialState, failureAction)).toEqual(
      state
    );
  });
});
