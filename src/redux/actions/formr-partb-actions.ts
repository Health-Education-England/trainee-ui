import { ActionType } from "../types";
import {
  LOAD_FORMR_PARTB_SUCCESS,
  LOAD_FORMR_PARTB_FAILURE,
  LOAD_FORMR_PARTB_LIST_SUCCESS,
  LOAD_FORMR_PARTB_LIST_FAILURE,
  LOAD_FORMR_PARTB_INITIAL_VALUES_FAILURE,
  LOAD_FORMR_PARTB_INITIAL_VALUES_SUCCESS,
  FORMR_PARTB_MOVE_TO_SECTION
} from "../action_types";
import { FormRPartB } from "../../models/FormRPartB";
import { FormsService } from "../../services/FormsService";
import { TraineeProfileService } from "../../services/TraineeProfileService";
import { ProfileToFormRPartBInitialValues } from "../../models/ProfileToFormRPartBInitialValues";
import store from "../store/store";

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
  const newFormState = store.getState().newFormRPartB;
  if (newFormState.formData === null) {
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
  } else {
    return dispatch({
      type: FORMR_PARTB_MOVE_TO_SECTION,
      payload: {
        formData: newFormState.formData,
        section: newFormState.section
      }
    });
  }
};

export const moveToSection = (formData: FormRPartB, section: number = 1) => (
  dispatch: (action: ActionType) => any
) => {
  return dispatch({
    type: FORMR_PARTB_MOVE_TO_SECTION,
    payload: { formData, section }
  });
};
