import PersonReducer from "../reducers/person-reducer";
import { PersonState, ActionType } from "../types";
import {
  LOAD_TRAINEE_PROFILE_SUCCESS,
  LOAD_TRAINEE_PROFILE_FAILURE
} from "../action_types";

const initialState: PersonState = {
  traineeProfile: null,
  isLoaded: false
};

describe("person reducer", () => {
  it("should return initial state when no action passed", () => {
    const defaultAction: ActionType = { type: "", payload: null };

    expect(PersonReducer(undefined, defaultAction)).toEqual(initialState);
  });

  it("should return updated state when LOAD_TRAINEE_PROFILE_SUCCESS action passed", () => {
    const state: PersonState = {
      traineeProfile: null,
      isLoaded: true
    };

    const successAction: ActionType = {
      type: LOAD_TRAINEE_PROFILE_SUCCESS,
      payload: null
    };

    expect(PersonReducer(initialState, successAction)).toEqual(state);
  });

  it("should return updated state when LOAD_TRAINEE_PROFILE_FAILURE action passed", () => {
    const state: PersonState = {
      traineeProfile: null,
      isLoaded: false
    };

    const failureAction: ActionType = {
      type: LOAD_TRAINEE_PROFILE_FAILURE,
      payload: null
    };

    expect(PersonReducer(initialState, failureAction)).toEqual(state);
  });
});
