import { TraineeProfile } from "../../../models/TraineeProfile";
import { FormRPartA } from "../../../models/FormRPartA";

export function ProfileToFormRPartAInitialValuesMapping(
  traineeProfile: TraineeProfile | null
): FormRPartA | null {
  if (!traineeProfile) {
    return null;
  }

  const pd = traineeProfile.personalDetails;
  const programme = traineeProfile.programmeMemberships.reduce(function(a, b) {
    return a.startDate > b.startDate ? a : b;
  });

  const curriculum = programme.curricula
    .filter(c => c.curriculumSubType === "MEDICAL_CURRICULUM")
    .reduce(function(a, b) {
      return a.curriculumStartDate > b.curriculumStartDate ? a : b;
    });

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
    programmeSpecialty: curriculum?.curriculumName || "",
    cctSpecialty1: curriculum?.curriculumName || "",
    cctSpecialty2: "",
    college: "",
    completionDate: programme.programmeCompletionDate || new Date(),
    trainingGrade: "",
    startDate: programme.startDate,
    programmeMembershipType: programme.programmeMembershipType || "",
    wholeTimeEquivalent: undefined,
    declarationType: "",
    otherImmigrationStatus: "",
    traineeTisId: traineeProfile.traineeTisId,
    submissionDate: "",
    lastModifiedDate: ""
  };
  return model;
}
