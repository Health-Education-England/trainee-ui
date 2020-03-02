import { GET_PERSONAL_DETAILS } from "../actions/types";

const initialState = {
  personalDetails: {},
  isLoaded: false,
  error: null
};

export default function(
  state = initialState,
  action: { type: any; payload: any }
) {
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
