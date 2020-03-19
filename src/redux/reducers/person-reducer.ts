import {
  LOAD_TRAINEE_PROFILE,
  LOAD_TRAINEE_PROFILE_FAILURE,
  LOAD_TRAINEE_PROFILE_SUCCESS,
  PersonActionType,
  PersonState
} from "../types";

const initialState: PersonState = {
  traineeProfile: null,
  isLoaded: false,
  error: null
};

export default function personReducer(
  state = initialState,
  action: PersonActionType
): PersonState {
  switch (action.type) {
    case LOAD_TRAINEE_PROFILE_SUCCESS:
      return {
        traineeProfile: action.payload,
        isLoaded: true,
        error: null
      };
    case LOAD_TRAINEE_PROFILE_FAILURE:
      return {
        traineeProfile: null,
        isLoaded: true,
        error: action.payload
      };
    case LOAD_TRAINEE_PROFILE:
      return {
        traineeProfile: null,
        isLoaded: false,
        error: null
      };
    default:
      return state;
  }
}
