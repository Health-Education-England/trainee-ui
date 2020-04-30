import { ActionType } from "../types";
import {
  LOAD_FORMR_PARTB_SUCCESS,
  LOAD_FORMR_PARTB_FAILURE,
  LOAD_FORMR_PARTB_LIST_SUCCESS,
  LOAD_FORMR_PARTB_LIST_FAILURE
} from "../action_types";
import { FormRPartB } from "../../models/FormRPartB";
import { FormsService } from "../../services/FormsService";

export const loadFormRPartBList = (formService: FormsService) => (
  dispatch: (action: ActionType) => any
) => {
  return formService
    .getTraineeFormRPartB()
    .then(response => {
      dispatch({
        type: LOAD_FORMR_PARTB_LIST_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
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
