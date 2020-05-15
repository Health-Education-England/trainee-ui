import { TraineeProfile } from "./TraineeProfile";
import { FormRPartB } from "./FormRPartB";

export function ProfileToFormRPartBInitialValues(
  traineeProfile: TraineeProfile | null
): FormRPartB | null {
  if (!traineeProfile) {
    return null;
  }
  const pd = traineeProfile.personalDetails;

  const programme =
    traineeProfile.programmeMemberships.length > 0
      ? traineeProfile.programmeMemberships.reduce(function(a, b) {
          return a.startDate > b.startDate ? a : b;
        })
      : null;

  const curriculum =
    programme && programme.curricula.length > 0
      ? programme.curricula
          .filter(c => c.curriculumSubType === "MEDICAL_CURRICULUM")
          .reduce(function(a, b) {
            return a.curriculumStartDate > b.curriculumStartDate ? a : b;
          })
      : null;

  const model: FormRPartB = {
    forename: pd?.forenames || "",
    surname: pd?.surname || "",
    gmcNumber: pd?.gmcNumber || "",
    email: "",
    localOfficeName: pd?.personOwner || "",
    prevRevalBody: pd?.prevRevalBody || "",
    currRevalDate: pd?.currRevalDate,
    prevRevalDate: pd?.prevRevalDate,
    programmeSpecialty: curriculum?.curriculumName || "",
    dualSpecialty: "",
    traineeTisId: traineeProfile.traineeTisId,
    submissionDate: null,
    lastModifiedDate: null
  };
  return model;
}
