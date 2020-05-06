import { ProfileToFormRPartBInitialValuesMapping } from "./../ProfileToFormRPartBInitialValuesMapping";
import { mockTraineeProfile } from "../../../../mock-data/trainee-profile";
import { FormRPartB } from "../../../../models/FormRPartB";

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
  submissionDate: null,
  lastModifiedDate: null
};

describe("ProfileToFormRPartBInitialValuesMapping", () => {
  it("should return null when null is passed", () => {
    expect(ProfileToFormRPartBInitialValuesMapping(null)).toEqual(null);
  });

  it("should return formrPartB when trainee profile is passed", () => {
    expect(ProfileToFormRPartBInitialValuesMapping(mockTraineeProfile)).toEqual(
      formrPartB
    );

    expect(
      ProfileToFormRPartBInitialValuesMapping(mockTraineeProfile)
        ?.programmeSpecialty
    ).toEqual("ST6");
  });

  it("should return formRPartA with empty programmespeciality when no programmeMemberships available", () => {
    const traineeProfile = { ...mockTraineeProfile, programmeMemberships: [] };
    expect(
      ProfileToFormRPartBInitialValuesMapping(traineeProfile)
        ?.programmeSpecialty
    ).toEqual("");
  });

  it("should return formRPartA with empty strings when no personal details available", () => {
    const traineeProfile = { ...mockTraineeProfile, personalDetails: null };
    expect(
      ProfileToFormRPartBInitialValuesMapping(traineeProfile)?.forename
    ).toEqual("");
  });
});
