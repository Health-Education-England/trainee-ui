import { ActionType } from "../types";
import {
  LOAD_INITIAL_VALUES_FAILURE,
  LOAD_INITIAL_VALUES_SUCCESS,
  LOAD_REFERENCE_GENDER_SUCCESS,
  LOAD_REFERENCE_GENDER_FAILURE,
  LOAD_REFERENCE_QUALIFICATIONS_SUCCESS,
  LOAD_REFERENCE_QUALIFICATIONS_FAILURE,
  LOAD_REFERENCE_COLLEGES_SUCCESS,
  LOAD_REFERENCE_COLLEGES_FAILURE,
  LOAD_REFERENCE_LOCAL_OFFICES_SUCCESS,
  LOAD_REFERENCE_LOCAL_OFFICES_FAILURE,
  LOAD_REFERENCE_GRADES_SUCCESS,
  LOAD_REFERENCE_GRADES_FAILURE,
  LOAD_REFERENCE_IMMIGRATION_STATUS_SUCCESS,
  LOAD_REFERENCE_IMMIGRATION_STATUS_FAILURE,
  LOAD_FORMR_PARTA_LIST_SUCCESS,
  LOAD_FORMR_PARTA_LIST_FAILURE,
  LOAD_FORMR_PARTA_SUCCESS,
  LOAD_FORMR_PARTA_FAILURE
} from "../action_types";
import { TraineeProfileService } from "../../services/TraineeProfileService";
import { FormRPartA } from "../../models/FormRPartA";
import { TraineeReferenceService } from "../../services/TraineeReferenceService";
import { KeyValue } from "../../models/KeyValue";
import { AxiosResponse } from "axios";
import { FormRPartAService } from "../../services/FormRPartAService";
import { mapProfileToFormRPartAInitialValues } from "../mapProfileToFormRPartAInitialValues";

const profileService = new TraineeProfileService();
const referenceService = new TraineeReferenceService();
const formService = new FormRPartAService();

export const loadFormRPartAInitialValues = () => (
  dispatch: (action: ActionType) => any
) => {
  profileService
    .getTraineeProfile()
    .then(response => {
      const initialValues = mapProfileToFormRPartAInitialValues(response.data);
      dispatch({
        type: LOAD_INITIAL_VALUES_SUCCESS,
        payload: initialValues
      });
    })
    .catch(error =>
      dispatch({
        type: LOAD_INITIAL_VALUES_FAILURE,
        payload: error
      })
    );

  referenceService
    .getGenders()
    .then(response => {
      dispatch({
        type: LOAD_REFERENCE_GENDER_SUCCESS,
        payload: getKeyValuesFromResponse(response)
      });
    })
    .catch(error =>
      dispatch({
        type: LOAD_REFERENCE_GENDER_FAILURE,
        payload: error
      })
    );

  referenceService
    .getQualifications()
    .then(response => {
      dispatch({
        type: LOAD_REFERENCE_QUALIFICATIONS_SUCCESS,
        payload: getKeyValuesFromResponse(response)
      });
    })
    .catch(error =>
      dispatch({
        type: LOAD_REFERENCE_QUALIFICATIONS_FAILURE,
        payload: error
      })
    );

  referenceService
    .getColleges()
    .then(response => {
      dispatch({
        type: LOAD_REFERENCE_COLLEGES_SUCCESS,
        payload: getKeyValuesFromResponse(response)
      });
    })
    .catch(error =>
      dispatch({
        type: LOAD_REFERENCE_COLLEGES_FAILURE,
        payload: error
      })
    );

  referenceService
    .getLocalOffices()
    .then(response => {
      dispatch({
        type: LOAD_REFERENCE_LOCAL_OFFICES_SUCCESS,
        payload: getKeyValuesFromResponse(response)
      });
    })
    .catch(error =>
      dispatch({
        type: LOAD_REFERENCE_LOCAL_OFFICES_FAILURE,
        payload: error
      })
    );

  referenceService
    .getTrainingGrades()
    .then(response => {
      dispatch({
        type: LOAD_REFERENCE_GRADES_SUCCESS,
        payload: getKeyValuesFromResponse(response)
      });
    })
    .catch(error =>
      dispatch({
        type: LOAD_REFERENCE_GRADES_FAILURE,
        payload: error
      })
    );

  referenceService
    .getImmigrationStatuses()
    .then(response => {
      dispatch({
        type: LOAD_REFERENCE_IMMIGRATION_STATUS_SUCCESS,
        payload: getKeyValuesFromResponse(response)
      });
    })
    .catch(error =>
      dispatch({
        type: LOAD_REFERENCE_IMMIGRATION_STATUS_FAILURE,
        payload: error
      })
    );
};

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

function getKeyValuesFromResponse(response: AxiosResponse<any[]>): KeyValue[] {
  return response.data.map<KeyValue>(d => {
    return {
      label: d.label,
      value: d.label
    };
  });
}
