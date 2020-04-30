import { ActionType } from "../types";
import {
  LOAD_FORMR_PARTA_LIST_SUCCESS,
  LOAD_FORMR_PARTA_LIST_FAILURE,
  LOAD_FORMR_PARTA_SUCCESS,
  LOAD_FORMR_PARTA_FAILURE
} from "../action_types";
import { FormRPartA } from "../../models/FormRPartA";
import { FormsService } from "../../services/FormsService";

export const loadFormRPartAList = (formService: FormsService) => (
  dispatch: (action: ActionType) => any
) => {
  return formService
    .getTraineeFormRPartA()
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

export const loadFormRPartA = (formData: FormRPartA | null) => (
  dispatch: (action: ActionType) => any
) => {
  return dispatch({
    type: formData ? LOAD_FORMR_PARTA_SUCCESS : LOAD_FORMR_PARTA_FAILURE,
    payload: formData
  });
};
