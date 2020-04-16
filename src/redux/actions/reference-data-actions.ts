import { ActionType } from "../types";
import {
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
  LOAD_REFERENCE_IMMIGRATION_STATUS_FAILURE
} from "../action_types";
import { TraineeReferenceService } from "../../services/TraineeReferenceService";
import { KeyValue } from "../../models/KeyValue";
import { AxiosResponse } from "axios";

const referenceService = new TraineeReferenceService();

export const loadReferenceData = () => (
  dispatch: (action: ActionType) => any
) => {
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

function getKeyValuesFromResponse(response: AxiosResponse<any[]>): KeyValue[] {
  return response.data.map<KeyValue>(d => {
    return {
      label: d.label,
      value: d.label
    };
  });
}
