import { ActionType } from "../types";
import {
  LOAD_FORMR_PARTA_LIST_SUCCESS,
  LOAD_FORMR_PARTA_LIST_FAILURE,
  UPDATE_FORMR_PARTA,
  INITIALIZE_FORMR_PARTA_FAILURE,
  INITIALIZE_FORMR_PARTA_SUCCESS
} from "../action_types";
import { FormRPartA } from "../../models/FormRPartA";
import { FormsService } from "../../services/FormsService";
import { TraineeProfileService } from "../../services/TraineeProfileService";
import { ProfileToFormRPartAInitialValues } from "../../models/ProfileToFormRPartAInitialValues";

export const loadFormRPartAList = (formService: FormsService) => (
  dispatch: (action: ActionType) => any
) => {
  return formService
    .getTraineeFormRPartAList()
    .then(response => {
      dispatch({
        type: LOAD_FORMR_PARTA_LIST_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: LOAD_FORMR_PARTA_LIST_FAILURE,
        payload: error
      });
    });
};

export const initializeForm = (
  traineeProfileService: TraineeProfileService
) => (dispatch: (action: ActionType) => any) => {
  return traineeProfileService
    .getTraineeProfile()
    .then(response => {
      dispatch({
        type: INITIALIZE_FORMR_PARTA_SUCCESS,
        payload: ProfileToFormRPartAInitialValues(response.data)
      });
    })
    .catch(error => {
      dispatch({
        type: INITIALIZE_FORMR_PARTA_FAILURE,
        payload: null
      });
    });
};

export const loadSavedForm = (formService: FormsService, formId: string) => (
  dispatch: (action: ActionType) => any
) => {
  return formService
    .getTraineeFormRPartAByFormId(formId)
    .then(response => {
      dispatch({
        type: INITIALIZE_FORMR_PARTA_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: INITIALIZE_FORMR_PARTA_FAILURE,
        payload: null
      });
    });
};

export const updateFormData = (formData: FormRPartA | null) => (
  dispatch: (action: ActionType) => any
) => {
  return dispatch({
    type: UPDATE_FORMR_PARTA,
    payload: formData
  });
};

export const saveTraineeFormRPartA = (
  formService: FormsService,
  formData: FormRPartA
) => (dispatch: (action: ActionType) => any) => {
  return formService.saveTraineeFormRPartA(formData);
};
