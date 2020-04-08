import {
  ActionType,
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
  LOAD_REFERENCE_GRADES_FAILURE
} from "../types";
import { TraineeProfileService } from "../../services/TraineeProfileService";
import { TraineeProfile } from "../../models/TraineeProfile";
import { FormRPartA } from "../../models/FormRPartA";
import { TraineeReferenceService } from "../../services/TraineeReferenceService";
import { KeyValue } from "../../models/KeyValue";
import { AxiosResponse } from "axios";

const profileService = new TraineeProfileService();
const referenceService = new TraineeReferenceService();

export const fetchTraineeFormRPartAInitialValues = () => (
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
};

function mapProfileToFormRPartAInitialValues(
  traineeProfile: TraineeProfile
): FormRPartA {
  const pd = traineeProfile.personalDetails;
  const programme = traineeProfile.programmeMemberships[0];

  const model: FormRPartA = {
    forename: pd.forenames,
    surname: pd.surname,
    gmcNumber: pd.gmcNumber,
    localOfficeName: pd.personOwner,
    dateOfBirth: pd.dateOfBirth,
    gender: pd.gender,
    immigrationStatus: "",
    qualification: pd.qualification,
    dateAttained: pd.dateAttained,
    medicalSchool: pd.medicalSchool,
    address1: pd.address1,
    address2: pd.address2,
    address3: pd.address3,
    address4: pd.address4,
    postCode: pd.postCode,
    telephoneNumber: pd.telephoneNumber,
    mobileNumber: pd.mobileNumber,
    email: pd.email,
    isLeadingToCct: false,
    programmeSpecialty: programme.curricula[0].curriculumName,
    cctSpecialty1: "",
    cctSpecialty2: "",
    college: "",
    completionDate: programme.endDate.toString(),
    trainingGrade: "",
    startDate: programme.startDate.toString(),
    programmeMembershipType: programme.programmeName,
    wholeTimeEquivalent: "",
    submissionDate: new Date().toLocaleDateString(),
    lastModifiedDate: new Date().toLocaleDateString(),
    declarationType: "",
    otherImmigrationStatus: "",
    traineeTisId: traineeProfile.traineeTisId
  };

  return model;
}

function getKeyValuesFromResponse(response: AxiosResponse<any[]>): KeyValue[] {
  return response.data.map<KeyValue>(d => {
    return {
      label: d.label,
      value: d.label
    };
  });
}
