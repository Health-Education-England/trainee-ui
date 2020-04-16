import FormRPartAReducer from "../reducers/formr-parta-reducer";
import { ActionType, FormRPartAState } from "../types";
import {
  LOAD_INITIAL_VALUES_SUCCESS,
  LOAD_INITIAL_VALUES_FAILURE,
  LOAD_REFERENCE_GENDER_SUCCESS,
  LOAD_REFERENCE_GENDER_FAILURE,
  LOAD_REFERENCE_COLLEGES_SUCCESS,
  LOAD_REFERENCE_COLLEGES_FAILURE,
  LOAD_REFERENCE_QUALIFICATIONS_SUCCESS,
  LOAD_REFERENCE_QUALIFICATIONS_FAILURE,
  LOAD_REFERENCE_LOCAL_OFFICES_FAILURE,
  LOAD_REFERENCE_LOCAL_OFFICES_SUCCESS,
  LOAD_REFERENCE_GRADES_FAILURE,
  LOAD_REFERENCE_GRADES_SUCCESS,
  LOAD_REFERENCE_IMMIGRATION_STATUS_SUCCESS,
  LOAD_REFERENCE_IMMIGRATION_STATUS_FAILURE
} from "../action_types";

describe("form-r part-a reducer", () => {
  const initialState: FormRPartAState = {
    intialFormValues: null,
    genders: [],
    colleges: [],
    localOffices: [],
    qualifications: [],
    grades: [],
    immigrationStatuses: [],
    isLoaded: false
  };

  it("should return initial state when no action passed", () => {
    const defaultAction: ActionType = {
      type: "",
      payload: null
    };

    expect(FormRPartAReducer(undefined, defaultAction)).toEqual(initialState);
  });

  it("should return updated state when LOAD_INITIAL_VALUES_SUCCESS action passed", () => {
    const state: FormRPartAState = {
      ...initialState,
      intialFormValues: null,
      isLoaded: true
    };

    const successAction: ActionType = {
      type: LOAD_INITIAL_VALUES_SUCCESS,
      payload: null
    };

    expect(FormRPartAReducer(initialState, successAction)).toEqual(state);
  });

  it("should return updated state when LOAD_REFERENCE_GENDER_SUCCESS action passed", () => {
    const state: FormRPartAState = {
      ...initialState,
      genders: [],
      isLoaded: true
    };

    const successAction: ActionType = {
      type: LOAD_REFERENCE_GENDER_SUCCESS,
      payload: []
    };

    expect(FormRPartAReducer(initialState, successAction)).toEqual(state);
  });

  it("should return updated state when LOAD_REFERENCE_COLLEGES_SUCCESS action passed", () => {
    const state: FormRPartAState = {
      ...initialState,
      colleges: [],
      isLoaded: true
    };

    const successAction: ActionType = {
      type: LOAD_REFERENCE_COLLEGES_SUCCESS,
      payload: []
    };

    expect(FormRPartAReducer(initialState, successAction)).toEqual(state);
  });

  it("should return updated state when LOAD_REFERENCE_QUALIFICATIONS_SUCCESS action passed", () => {
    const state: FormRPartAState = {
      ...initialState,
      colleges: [],
      isLoaded: true
    };

    const successAction: ActionType = {
      type: LOAD_REFERENCE_QUALIFICATIONS_SUCCESS,
      payload: []
    };

    expect(FormRPartAReducer(initialState, successAction)).toEqual(state);
  });

  it("should return updated state when LOAD_REFERENCE_LOCAL_OFFICES_SUCCESS action passed", () => {
    const state: FormRPartAState = {
      ...initialState,
      localOffices: [],
      isLoaded: true
    };

    const successAction: ActionType = {
      type: LOAD_REFERENCE_LOCAL_OFFICES_SUCCESS,
      payload: []
    };

    expect(FormRPartAReducer(initialState, successAction)).toEqual(state);
  });

  it("should return updated state when LOAD_REFERENCE_GRADES_SUCCESS action passed", () => {
    const state: FormRPartAState = {
      ...initialState,
      grades: [],
      isLoaded: true
    };

    const successAction: ActionType = {
      type: LOAD_REFERENCE_GRADES_SUCCESS,
      payload: []
    };

    expect(FormRPartAReducer(initialState, successAction)).toEqual(state);
  });

  it("should return updated state when LOAD_REFERENCE_IMMIGRATION_STATUS_SUCCESS action passed", () => {
    const state: FormRPartAState = {
      ...initialState,
      immigrationStatuses: [],
      isLoaded: true
    };

    const successAction: ActionType = {
      type: LOAD_REFERENCE_IMMIGRATION_STATUS_SUCCESS,
      payload: []
    };

    expect(FormRPartAReducer(initialState, successAction)).toEqual(state);
  });

  test.each([
    LOAD_INITIAL_VALUES_FAILURE,
    LOAD_REFERENCE_GENDER_FAILURE,
    LOAD_REFERENCE_COLLEGES_FAILURE,
    LOAD_REFERENCE_LOCAL_OFFICES_FAILURE,
    LOAD_REFERENCE_QUALIFICATIONS_FAILURE,
    LOAD_REFERENCE_GRADES_FAILURE,
    LOAD_REFERENCE_IMMIGRATION_STATUS_FAILURE
  ])("should return updated state when $a action passed", actionType => {
    const state: FormRPartAState = {
      ...initialState,
      isLoaded: false
    };

    const failureAction: ActionType = {
      type: actionType,
      payload: null
    };

    expect(FormRPartAReducer(initialState, failureAction)).toEqual(state);
  });
});
