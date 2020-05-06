import { ActionType, FormRPartBListState, FormRPartBViewState } from "../types";
import {
  LOAD_FORMR_PARTB_SUCCESS,
  LOAD_FORMR_PARTB_FAILURE,
  LOAD_FORMR_PARTB_LIST_SUCCESS,
  LOAD_FORMR_PARTB_LIST_FAILURE
} from "../action_types";

const formRPartAViewState: FormRPartBViewState = {
  formData: null
};

export function LoadFormRPartBReducer(
  state = formRPartAViewState,
  action: ActionType
): FormRPartBViewState {
  switch (action.type) {
    case LOAD_FORMR_PARTB_SUCCESS:
      return {
        ...state,
        formData: action.payload
      };
    case LOAD_FORMR_PARTB_FAILURE:
      return {
        ...state,
        formData: null
      };
    default:
      return state;
  }
}

const formRPartAListState: FormRPartBListState = {
  submittedForms: []
};

export function LoadFormRPartBListReducer(
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
