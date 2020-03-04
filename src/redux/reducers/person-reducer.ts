import {
  LOAD_TRAINEE_PROFILE,
  LOAD_TRAINEE_PROFILE_FAILURE,
  LOAD_TRAINEE_PROFILE_SUCCESS,
  PersonActionType,
  PersonState
} from "../types";

const initialState: PersonState = {
  personalDetails: null,
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
        personalDetails: action.payload,
        isLoaded: true,
        error: null
      };
    case LOAD_TRAINEE_PROFILE_FAILURE:
      return {
        personalDetails: null,
        isLoaded: true,
        error: action.payload
      };
    case LOAD_TRAINEE_PROFILE:
      return {
        personalDetails: null,
        isLoaded: false,
        error: null
      };
    default:
      return state;
  }
}
