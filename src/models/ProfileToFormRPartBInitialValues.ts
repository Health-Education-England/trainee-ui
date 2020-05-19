import { TraineeProfile } from "./TraineeProfile";
import { FormRPartB, Work } from "./FormRPartB";

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

  const work = traineeProfile.placements.map<Work>(placement => {
    const work: Work = {
      typeOfWork: `${placement.placementType} ${placement.grade} ${placement.specialty}`,
      startDate: placement.startDate,
      endDate: placement.endDate,
      site: placement.site,
      siteLocation: placement.siteLocation,
      trainingPost: placement.placementType === "In Post" ? "Yes" : ""
    };

    return work;
  });

  const model: FormRPartB = {
    forename: pd?.forenames || "",
    surname: pd?.surname || "",
    gmcNumber: pd?.gmcNumber || "",
    email: "",
    localOfficeName: pd?.personOwner || "",
    prevRevalBody: pd?.prevRevalBody || "",
    currRevalDate: pd?.currRevalDate || undefined,
    prevRevalDate: pd?.prevRevalDate || undefined,
    programmeSpecialty: curriculum?.curriculumName || "",
    dualSpecialty: "",
    traineeTisId: traineeProfile.traineeTisId,
    work: work,
    sicknessAbsence: 0,
    parentalLeave: 0,
    careerBreaks: 0,
    paidLeave: 0,
    unauthorisedLeave: 0,
    otherLeave: 0,
    totalLeave: 0,
    submissionDate: null,
    lastModifiedDate: null
  };
  return model;
}
