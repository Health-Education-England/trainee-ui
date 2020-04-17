import { ActionType } from "../types";
import {
  LOAD_FORMR_PARTA_LIST_SUCCESS,
  LOAD_FORMR_PARTA_LIST_FAILURE,
  LOAD_FORMR_PARTA_SUCCESS,
  LOAD_FORMR_PARTA_FAILURE
} from "../action_types";
import { FormRPartA } from "../../models/FormRPartA";
import { FormRPartAService } from "../../services/FormRPartAService";

const formService = new FormRPartAService();

export const loadFormRPartAList = () => (
  dispatch: (action: ActionType) => any
) => {
  formService
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

export const loadFormRPartA = (formData: FormRPartA) => (
  dispatch: (action: ActionType) => any
) => {
  if (formData) {
    dispatch({
      type: LOAD_FORMR_PARTA_SUCCESS,
      payload: formData
    });
  } else {
    dispatch({
      type: LOAD_FORMR_PARTA_FAILURE,
      payload: null
    });
  }
};
