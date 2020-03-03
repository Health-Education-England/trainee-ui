import { GET_PERSONAL_DETAILS } from "../actions/types";
import { PersonalDetails } from "../../models/PersonalDetails";

const initialState: PersonState = {
  personalDetails: null,
  isLoaded: false,
  error: null
};

export interface PersonState {
  personalDetails: PersonalDetails | null;
  isLoaded: boolean;
  error: any;
}

export default function personReducer(
  state = initialState,
  action: { type: any; payload: any }
): PersonState {
  switch (action.type) {
    case GET_PERSONAL_DETAILS:
      return {
        personalDetails: action.payload.personalDetails,
        isLoaded: action.payload.isLoaded,
        error: action.payload.error
      };
    default:
      return state;
  }
}
