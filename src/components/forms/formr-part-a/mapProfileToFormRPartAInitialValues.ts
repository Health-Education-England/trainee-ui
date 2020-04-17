import { TraineeProfile } from "../../../models/TraineeProfile";
import { FormRPartA } from "../../../models/FormRPartA";

export function mapProfileToFormRPartAInitialValues(
  traineeProfile: TraineeProfile | null
): FormRPartA | null {
  if (!traineeProfile) {
    return null;
  }

  const pd = traineeProfile.personalDetails;
  const programme = traineeProfile.programmeMemberships[0];
  const model: FormRPartA = {
    forename: pd.forenames || "",
    surname: pd.surname || "",
    gmcNumber: pd.gmcNumber || "",
    localOfficeName: pd.personOwner || "",
    dateOfBirth: pd.dateOfBirth || "",
    gender: pd.gender || "",
    immigrationStatus: "",
    qualification: pd.qualification || "",
    dateAttained: pd.dateAttained || "",
    medicalSchool: pd.medicalSchool || "",
    address1: pd.address1 || "",
    address2: pd.address2 || "",
    address3: pd.address3 || "",
    address4: pd.address4 || "",
    postCode: pd.postCode || "",
    telephoneNumber: pd.telephoneNumber || "",
    mobileNumber: pd.mobileNumber || "",
    email: pd.email || "",
    isLeadingToCct: false,
    programmeSpecialty: programme.curricula[0].curriculumName,
    cctSpecialty1: "",
    cctSpecialty2: "",
    college: "",
    completionDate: programme.endDate || "",
    trainingGrade: "",
    startDate: programme.startDate || "",
    programmeMembershipType: programme.programmeName || "",
    wholeTimeEquivalent: null,
    declarationType: "",
    otherImmigrationStatus: "",
    traineeTisId: traineeProfile.traineeTisId,
    submissionDate: "",
    lastModifiedDate: ""
  };
  return model;
}
