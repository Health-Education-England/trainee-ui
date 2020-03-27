import {
  ActionType,
  LOAD_FORMR_INITIALVALUES,
  LOAD_FORMR_INITIALVALUES_FAILURE,
  LOAD_FORMR_INITIALVALUES_SUCCESS
} from "../types";
import { TraineeProfileService } from "../../services/TraineeProfileService";
import { TraineeProfile } from "../../models/TraineeProfile";
import { FormRPartA } from "../../models/FormRPartA";

const profileService = new TraineeProfileService();

export const fetchTraineeFormRPartAInitialValues = () => (
  dispatch: (action: ActionType) => any
) => {
  profileService
    .getTraineeProfile()
    .then(response => {
      const initialValues = mapProfileToFormRPartAInitialValues(response.data);
      dispatch({
        type: LOAD_FORMR_INITIALVALUES_SUCCESS,
        payload: initialValues
      });
    })
    .catch(error =>
      dispatch({
        type: LOAD_FORMR_INITIALVALUES_FAILURE,
        payload: error
      })
    );

  return dispatch({
    type: LOAD_FORMR_INITIALVALUES,
    payload: null
  });
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
    localOfficeName: programme.managingDeanery,
    dateOfBirth: "",
    gender: "",
    immigrationStatus: "",
    qualification: "",
    dateAttained: "",
    medicalSchool: "",
    address1: pd.address1,
    address2: pd.address2,
    address3: pd.address3,
    address4: pd.address4,
    postCode: pd.postCode,
    telephoneNumber: pd.telephoneNumber,
    mobileNumber: pd.mobileNumber,
    email: pd.email,
    isLeadingToCct: false,
    programmeSpecialty: "",
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

export default fetchTraineeFormRPartAInitialValues;
