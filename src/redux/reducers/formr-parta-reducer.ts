import { ActionType, FormRPartAState } from "../types";
import {
  LOAD_INITIAL_VALUES_SUCCESS,
  LOAD_INITIAL_VALUES_FAILURE,
  LOAD_REFERENCE_GENDER_SUCCESS,
  LOAD_REFERENCE_GENDER_FAILURE,
  LOAD_REFERENCE_COLLEGES_SUCCESS,
  LOAD_REFERENCE_COLLEGES_FAILURE,
  LOAD_REFERENCE_QUALIFICATIONS_SUCCESS,
  LOAD_REFERENCE_LOCAL_OFFICES_FAILURE,
  LOAD_REFERENCE_LOCAL_OFFICES_SUCCESS,
  LOAD_REFERENCE_QUALIFICATIONS_FAILURE,
  LOAD_REFERENCE_GRADES_SUCCESS,
  LOAD_REFERENCE_GRADES_FAILURE,
  LOAD_REFERENCE_IMMIGRATION_STATUS_SUCCESS,
  LOAD_REFERENCE_IMMIGRATION_STATUS_FAILURE
} from "../action_types";

const initialState: FormRPartAState = {
  intialFormValues: null,
  genders: [],
  colleges: [],
  localOffices: [],
  qualifications: [],
  grades: [],
  immigrationStatuses: [],
  isLoaded: false
};

export default function FormRPartAReducer(
  state = initialState,
  action: ActionType
): FormRPartAState {
  switch (action.type) {
    case LOAD_INITIAL_VALUES_SUCCESS:
      return {
        ...state,
        intialFormValues: action.payload,
        isLoaded: true
      };

    case LOAD_REFERENCE_GENDER_SUCCESS:
      return {
        ...state,
        genders: action.payload,
        isLoaded: true
      };

    case LOAD_REFERENCE_COLLEGES_SUCCESS:
      return {
        ...state,
        colleges: action.payload,
        isLoaded: true
      };

    case LOAD_REFERENCE_QUALIFICATIONS_SUCCESS:
      return {
        ...state,
        qualifications: action.payload,
        isLoaded: true
      };

    case LOAD_REFERENCE_LOCAL_OFFICES_SUCCESS:
      return {
        ...state,
        localOffices: action.payload,
        isLoaded: true
      };

    case LOAD_REFERENCE_GRADES_SUCCESS:
      return {
        ...state,
        grades: action.payload,
        isLoaded: true
      };

    case LOAD_REFERENCE_IMMIGRATION_STATUS_SUCCESS:
      return {
        ...state,
        immigrationStatuses: action.payload,
        isLoaded: true
      };

    case LOAD_INITIAL_VALUES_FAILURE:
    case LOAD_REFERENCE_GENDER_FAILURE:
    case LOAD_REFERENCE_COLLEGES_FAILURE:
    case LOAD_REFERENCE_QUALIFICATIONS_FAILURE:
    case LOAD_REFERENCE_LOCAL_OFFICES_FAILURE:
    case LOAD_REFERENCE_GRADES_FAILURE:
    case LOAD_REFERENCE_IMMIGRATION_STATUS_FAILURE:
      return {
        ...state,
        isLoaded: false
      };

    default:
      return state;
  }
}
