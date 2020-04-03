import {
  LOAD_TRAINEE_PROFILE_FAILURE,
  LOAD_TRAINEE_PROFILE_SUCCESS,
  ActionType,
  PersonState
} from "../types";

const initialState: PersonState = {
  traineeProfile: null,
  isLoaded: false,
  error: null
};

export default function personReducer(
  state = initialState,
  action: ActionType
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
    default:
      return state;
  }
}
