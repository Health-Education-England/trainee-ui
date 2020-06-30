import { ActionType, FormRPartAViewState, FormRPartAListState } from "../types";
import {
  UPDATE_FORMR_PARTA,
  LOAD_FORMR_PARTA_FAILURE,
  LOAD_FORMR_PARTA_LIST_SUCCESS,
  LOAD_FORMR_PARTA_LIST_FAILURE
} from "../action_types";
import {
  LoadFormRPartAReducer,
  LoadFormRPartAListReducer
} from "../reducers/formr-parta-reducer";

describe("Load form-r part-a reducer", () => {
  const initialState: FormRPartAViewState = {
    formData: null
  };

  it("should return initial state when no action passed", () => {
    const defaultAction: ActionType = {
      type: "",
      payload: null
    };

    expect(LoadFormRPartAReducer(undefined, defaultAction)).toEqual(
      initialState
    );
  });

  it("should return updated state when UPDATE_FORMR_PARTA action passed", () => {
    const state: FormRPartAViewState = {
      ...initialState,
      formData: null
    };

    const successAction: ActionType = {
      type: UPDATE_FORMR_PARTA,
      payload: null
    };

    expect(LoadFormRPartAReducer(initialState, successAction)).toEqual(state);
  });

  it("should return updated state when LOAD_FORMR_PARTA_FAILURE action passed", () => {
    const state: FormRPartAViewState = {
      ...initialState
    };

    const failureAction: ActionType = {
      type: LOAD_FORMR_PARTA_FAILURE,
      payload: null
    };

    expect(LoadFormRPartAReducer(initialState, failureAction)).toEqual(state);
  });
});

describe("Load form-r part-a list reducer", () => {
  const initialState: FormRPartAListState = {
    submittedForms: []
  };

  it("should return initial state when no action passed", () => {
    const defaultAction: ActionType = {
      type: "",
      payload: null
    };

    expect(LoadFormRPartAListReducer(undefined, defaultAction)).toEqual(
      initialState
    );
  });

  it("should return updated state when LOAD_FORMR_PARTA_LIST_SUCCESS action passed", () => {
    const state: FormRPartAListState = {
      ...initialState,
      submittedForms: []
    };

    const successAction: ActionType = {
      type: LOAD_FORMR_PARTA_LIST_SUCCESS,
      payload: []
    };

    expect(LoadFormRPartAListReducer(initialState, successAction)).toEqual(
      state
    );
  });

  it("should return updated state when LOAD_FORMR_PARTA_LIST_FAILURE action passed", () => {
    const state: FormRPartAListState = {
      ...initialState
    };

    const failureAction: ActionType = {
      type: LOAD_FORMR_PARTA_LIST_FAILURE,
      payload: null
    };

    expect(LoadFormRPartAListReducer(initialState, failureAction)).toEqual(
      state
    );
  });
});
