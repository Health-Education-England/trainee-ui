import { ProfileToFormRPartBInitialValues } from "./../ProfileToFormRPartBInitialValues";
import { mockTraineeProfile } from "../../mock-data/trainee-profile";
import { FormRPartB } from "../FormRPartB";

const formrPartB: FormRPartB = {
  traineeTisId: "123",
  forename: "Anthony Mara",
  surname: "Gilliam",
  gmcNumber: "11111111",
  localOfficeName: "Health Education England Thames Valley",
  email: "",
  programmeSpecialty: "ST6",
  prevRevalBody: "",
  currRevalDate: new Date("2021-12-31"),
  prevRevalDate: new Date("2021-12-31"),
  dualSpecialty: "",
  work: [
    {
      endDate: new Date("2020-12-31"),
      site: "Addenbrookes Hospital",
      siteLocation: undefined,
      startDate: new Date("2020-01-01"),
      trainingPost: "Yes",
      typeOfWork: "In Post ST1 Dermatology"
    }
  ],
  sicknessAbsence: 0,
  parentalLeave: 0,
  careerBreaks: 0,
  paidLeave: 0,
  unauthorisedLeave: 0,
  otherLeave: 0,
  totalLeave: 0,
  isHonest: undefined,
  isHealthy: undefined,
  isWarned: undefined,
  isComplying: undefined,
  healthStatement: "",
  submissionDate: null,
  lastModifiedDate: null
};

describe("ProfileToFormRPartBInitialValues", () => {
  it("should return null when null is passed", () => {
    expect(ProfileToFormRPartBInitialValues(null)).toEqual(null);
  });

  it("should return formrPartB when trainee profile is passed", () => {
    expect(ProfileToFormRPartBInitialValues(mockTraineeProfile)).toEqual(
      formrPartB
    );

    expect(
      ProfileToFormRPartBInitialValues(mockTraineeProfile)?.programmeSpecialty
    ).toEqual("ST6");
  });

  it("should return formRPartA with empty programmespeciality when no programmeMemberships available", () => {
    const traineeProfile = { ...mockTraineeProfile, programmeMemberships: [] };
    expect(
      ProfileToFormRPartBInitialValues(traineeProfile)?.programmeSpecialty
    ).toEqual("");
  });

  it("should return formRPartA with empty strings when no personal details available", () => {
    const traineeProfile = { ...mockTraineeProfile, personalDetails: null };
    expect(ProfileToFormRPartBInitialValues(traineeProfile)?.forename).toEqual(
      ""
    );
  });
});
