import { ActionType, FormRPartBListState, FormRPartBState } from "../types";
import {
  LOAD_FORMR_PARTB_LIST_SUCCESS,
  LOAD_FORMR_PARTB_LIST_FAILURE,
  INITIALIZE_FORMR_PARTB_FAILURE,
  INITIALIZE_FORMR_PARTB_SUCCESS,
  MOVE_TO_SECTION,
  EDIT_FORMR_PARTB,
  LOAD_FORMR_PARTB
} from "../action_types";

const formRPartAListState: FormRPartBListState = {
  submittedForms: []
};

const initialState: FormRPartBState = {
  formData: null,
  section: 1
};

export function FormRPartBListReducer(
  state = formRPartAListState,
  action: ActionType
): FormRPartBListState {
  switch (action.type) {
    case LOAD_FORMR_PARTB_LIST_SUCCESS:
      return {
        ...state,
        submittedForms: action.payload
      };
    case LOAD_FORMR_PARTB_LIST_FAILURE:
      return {
        ...state,
        submittedForms: []
      };
    default:
      return state;
  }
}

export function FormRPartBReducer(
  state = { ...initialState },
  action: ActionType
): FormRPartBState {
  switch (action.type) {
    case INITIALIZE_FORMR_PARTB_SUCCESS:
      return {
        ...state,
        formData: action.payload,
        section: 1
      };
    case INITIALIZE_FORMR_PARTB_FAILURE:
      return {
        ...state,
        formData: null,
        section: 1
      };
    case LOAD_FORMR_PARTB:
      return {
        ...state,
        formData: action.payload
      };
    case MOVE_TO_SECTION:
      return {
        ...state,
        section: action.payload
      };
    case EDIT_FORMR_PARTB:
    default:
      return {
        ...state
      };
  }
}
