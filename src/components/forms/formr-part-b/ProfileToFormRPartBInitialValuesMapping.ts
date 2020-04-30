import { TraineeProfile } from "../../../models/TraineeProfile";
import { FormRPartB } from "../../../models/FormRPartB";

export function ProfileToFormRPartBInitialValuesMapping(
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
    previousRevalBody: pd?.previousRevalBody || "",
    currentRevalDate: pd?.currentRevalDate || new Date("1800-01-01"),
    previousRevalDate: pd?.previousRevalDate || new Date("1800-01-01"),
    programmeSpecialty: curriculum?.curriculumName || "",
    dualSpecialty: ""
  };
  return model;
}
