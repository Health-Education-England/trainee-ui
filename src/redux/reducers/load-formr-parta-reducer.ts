import { ActionType, FormRPartAViewState, FormRPartAListState } from "../types";
import {
  LOAD_FORMR_PARTA_SUCCESS,
  LOAD_FORMR_PARTA_FAILURE,
  LOAD_FORMR_PARTA_LIST_SUCCESS,
  LOAD_FORMR_PARTA_LIST_FAILURE
} from "../action_types";

const formRPartAViewState: FormRPartAViewState = {
  formData: null
};

export function LoadFormRPartAReducer(
  state = formRPartAViewState,
  action: ActionType
): FormRPartAViewState {
  switch (action.type) {
    case LOAD_FORMR_PARTA_SUCCESS:
      return {
        formData: action.payload
      };
    case LOAD_FORMR_PARTA_FAILURE:
      return state;
    default:
      return state;
  }
}

const formRPartAListState: FormRPartAListState = {
  submittedForms: []
};

export function LoadFormRPartAListReducer(
  state = formRPartAListState,
  action: ActionType
): FormRPartAListState {
  switch (action.type) {
    case LOAD_FORMR_PARTA_LIST_SUCCESS:
      return {
        submittedForms: action.payload
      };
    case LOAD_FORMR_PARTA_LIST_FAILURE:
      return state;
    default:
      return state;
  }
}
