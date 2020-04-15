import { ActionType, PersonState } from "../types";
import {
  LOAD_TRAINEE_PROFILE_FAILURE,
  LOAD_TRAINEE_PROFILE_SUCCESS
} from "../action_types";

const initialState: PersonState = {
  traineeProfile: null,
  isLoaded: false
};

export default function PersonReducer(
  state = initialState,
  action: ActionType
): PersonState {
  switch (action.type) {
    case LOAD_TRAINEE_PROFILE_SUCCESS:
      return {
        traineeProfile: action.payload,
        isLoaded: true
      };
    case LOAD_TRAINEE_PROFILE_FAILURE:
      return {
        ...state,
        isLoaded: false
      };
    default:
      return state;
  }
}
