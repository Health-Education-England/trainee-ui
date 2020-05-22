import {
  ActionType,
  FormRPartBListState,
  FormRPartBViewState,
  NewFormRPartBState
} from "../types";
import {
  LOAD_FORMR_PARTB_SUCCESS,
  LOAD_FORMR_PARTB_FAILURE,
  LOAD_FORMR_PARTB_LIST_SUCCESS,
  LOAD_FORMR_PARTB_LIST_FAILURE,
  LOAD_FORMR_PARTB_INITIAL_VALUES_FAILURE,
  LOAD_FORMR_PARTB_INITIAL_VALUES_SUCCESS,
  FORMR_PARTB_PREVIOUS_SECTION,
  FORMR_PARTB_NEXT_SECTION
} from "../action_types";

const formRPartAViewState: FormRPartBViewState = {
  formData: null
};

const formRPartAListState: FormRPartBListState = {
  submittedForms: []
};

const newFormRPartBState: NewFormRPartBState = {
  formData: null,
  section: 1
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

export function LoadNewFormRPartBReducer(
  state = newFormRPartBState,
  action: ActionType
): NewFormRPartBState {
  switch (action.type) {
    case LOAD_FORMR_PARTB_INITIAL_VALUES_SUCCESS:
      return {
        ...state,
        formData: action.payload
      };
    case LOAD_FORMR_PARTB_INITIAL_VALUES_FAILURE:
      return {
        ...state,
        formData: null
      };
    case FORMR_PARTB_NEXT_SECTION:
      return {
        ...state,
        formData: action.payload,
        section: state.section + 1
      };
    case FORMR_PARTB_PREVIOUS_SECTION:
      return {
        ...state,
        formData: action.payload,
        section: state.section - 1 >= 1 ? state.section - 1 : 1
      };
    default:
      return state;
  }
}
