import {
  LOAD_FORMR_INITIALVALUES,
  LOAD_FORMR_INITIALVALUES_SUCCESS,
  LOAD_FORMR_INITIALVALUES_FAILURE,
  ActionType,
  FormRPartAState
} from "../types";

const initialState: FormRPartAState = {
  intialFormValues: null,
  isLoaded: false,
  error: null
};

export default function formRPartAReducer(
  state = initialState,
  action: ActionType
): FormRPartAState {
  switch (action.type) {
    case LOAD_FORMR_INITIALVALUES_SUCCESS:
      return {
        intialFormValues: action.payload,
        isLoaded: true,
        error: null
      };
    case LOAD_FORMR_INITIALVALUES_FAILURE:
      return {
        intialFormValues: null,
        isLoaded: true,
        error: action.payload
      };
    case LOAD_FORMR_INITIALVALUES:
      return {
        intialFormValues: null,
        isLoaded: false,
        error: null
      };
    default:
      return state;
  }
}
