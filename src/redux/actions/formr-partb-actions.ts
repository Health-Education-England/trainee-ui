import { ActionType } from "../types";
import {
  LOAD_FORMR_PARTB_SUCCESS,
  LOAD_FORMR_PARTB_FAILURE,
  LOAD_FORMR_PARTB_LIST_SUCCESS,
  LOAD_FORMR_PARTB_LIST_FAILURE,
  LOAD_FORMR_PARTB_INITIAL_VALUES_FAILURE,
  LOAD_FORMR_PARTB_INITIAL_VALUES_SUCCESS,
  FORMR_PARTB_NEXT_SECTION,
  FORMR_PARTB_PREVIOUS_SECTION
} from "../action_types";
import { FormRPartB } from "../../models/FormRPartB";
import { FormsService } from "../../services/FormsService";
import { TraineeProfileService } from "../../services/TraineeProfileService";
import { ProfileToFormRPartBInitialValues } from "../../models/ProfileToFormRPartBInitialValues";

export const loadFormRPartBList = (formService: FormsService) => (
  dispatch: (action: ActionType) => any
) => {
  return formService
    .getTraineeFormRPartB()
    .then(response => {
      return dispatch({
        type: LOAD_FORMR_PARTB_LIST_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      return dispatch({
        type: LOAD_FORMR_PARTB_LIST_FAILURE,
        payload: error
      });
    });
};

export const loadFormRPartB = (formData: FormRPartB | null) => (
  dispatch: (action: ActionType) => any
) => {
  return dispatch({
    type: formData ? LOAD_FORMR_PARTB_SUCCESS : LOAD_FORMR_PARTB_FAILURE,
    payload: formData
  });
};

export const loadFormRPartBInitialValues = (
  traineeProfileService: TraineeProfileService
) => (dispatch: (action: ActionType) => any) => {
  return traineeProfileService
    .getTraineeProfile()
    .then(response => {
      dispatch({
        type: LOAD_FORMR_PARTB_INITIAL_VALUES_SUCCESS,
        payload: ProfileToFormRPartBInitialValues(response.data)
      });
    })
    .catch(error => {
      dispatch({
        type: LOAD_FORMR_PARTB_INITIAL_VALUES_FAILURE,
        payload: error
      });
    });
};

export const moveToNextSection = (formData: FormRPartB | null) => (
  dispatch: (action: ActionType) => any
) => {
  return dispatch({
    type: FORMR_PARTB_NEXT_SECTION,
    payload: formData
  });
};

export const moveToPreviousSection = (formData: FormRPartB | null) => (
  dispatch: (action: ActionType) => any
) => {
  return dispatch({
    type: FORMR_PARTB_PREVIOUS_SECTION,
    payload: formData
  });
};
