import { ActionType } from "../types";
import {
  LOAD_FORMR_PARTB,
  LOAD_FORMR_PARTB_LIST_SUCCESS,
  LOAD_FORMR_PARTB_LIST_FAILURE,
  INITIALIZE_FORMR_PARTB_FAILURE,
  INITIALIZE_FORMR_PARTB_SUCCESS,
  MOVE_TO_SECTION,
  EDIT_FORMR_PARTB,
  SAVE_FORMR_PARTB_SUCCESS,
  SAVE_FORMR_PARTB_FAILURE
} from "../action_types";
import { FormRPartB } from "../../models/FormRPartB";
import { FormsService } from "../../services/FormsService";
import { TraineeProfileService } from "../../services/TraineeProfileService";
import { ProfileToFormRPartBInitialValues } from "../../models/ProfileToFormRPartBInitialValues";

export const loadFormRPartBList = (formService: FormsService) => (
  dispatch: (action: ActionType) => any
) => {
  return formService
    .getTraineeFormRPartBList()
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

export const initializeForm = (
  traineeProfileService: TraineeProfileService
) => (dispatch: (action: ActionType) => any) => {
  return traineeProfileService
    .getTraineeProfile()
    .then(response => {
      dispatch({
        type: INITIALIZE_FORMR_PARTB_SUCCESS,
        payload: ProfileToFormRPartBInitialValues(response.data)
      });
    })
    .catch(error => {
      dispatch({
        type: INITIALIZE_FORMR_PARTB_FAILURE,
        payload: error
      });
    });
};

export const loadForm = (formData: FormRPartB | null) => (
  dispatch: (action: ActionType) => any
) => {
  return dispatch({
    type: LOAD_FORMR_PARTB,
    payload: formData
  });
};

export const editForm = (formData: FormRPartB, section: number) => (
  dispatch: (action: ActionType) => any
) => {
  return dispatch({
    type: EDIT_FORMR_PARTB,
    payload: { formData, section }
  });
};

export const saveForm = (
  formsService: FormsService,
  formData: FormRPartB
) => async (dispatch: (action: ActionType) => any) => {
  return formsService
    .saveTraineeFormRPartB(formData)
    .then(response =>
      dispatch({
        type: SAVE_FORMR_PARTB_SUCCESS,
        payload: response.data
      })
    )
    .catch(error =>
      dispatch({
        type: SAVE_FORMR_PARTB_FAILURE,
        payload: error
      })
    );
};

export const moveToSection = (section: number) => (
  dispatch: (action: ActionType) => any
) => {
  return dispatch({
    type: MOVE_TO_SECTION,
    payload: section
  });
};
