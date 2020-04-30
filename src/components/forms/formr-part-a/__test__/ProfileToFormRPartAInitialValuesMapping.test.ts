import { ProfileToFormRPartAInitialValuesMapping } from "./../ProfileToFormRPartAInitialValuesMapping";
import { mockTraineeProfile } from "../../../../mock-data/trainee-profile";
import { FormRPartA } from "../../../../models/FormRPartA";

const formrPartA: FormRPartA = {
  traineeTisId: "123",
  forename: "Anthony Mara",
  surname: "Gilliam",
  gmcNumber: "11111111",
  localOfficeName: "Health Education England Thames Valley",
  dateOfBirth: new Date("1911-11-30"),
  gender: "Male",
  immigrationStatus: "",
  qualification: "AKC - Association of King's College",
  dateAttained: new Date("2018-05-30"),
  medicalSchool: "University of Science and Technology",
  address1: "585-6360 Interdum Street",
  address2: "Goulburn",
  address3: "London",
  address4: "UK",
  postCode: "WC1B 5DN",
  telephoneNumber: "01632960363",
  mobileNumber: "07465879348",
  email: "email@email.com",
  declarationType: "",
  isLeadingToCct: false,
  programmeSpecialty: "ST6",
  cctSpecialty1: "ST6",
  cctSpecialty2: "",
  college: "",
  completionDate: new Date("2021-12-31"),
  trainingGrade: "",
  startDate: new Date("2022-01-01"),
  programmeMembershipType: "LAT",
  wholeTimeEquivalent: undefined,
  submissionDate: null,
  lastModifiedDate: null,
  otherImmigrationStatus: ""
};

describe("ProfileToFormRPartAInitialValuesMapping", () => {
  it("should return null when null is passed", () => {
    expect(ProfileToFormRPartAInitialValuesMapping(null)).toEqual(null);
  });

  it("should return formrPartA when trainee profile is passed", () => {
    expect(ProfileToFormRPartAInitialValuesMapping(mockTraineeProfile)).toEqual(
      formrPartA
    );

    expect(
      ProfileToFormRPartAInitialValuesMapping(mockTraineeProfile)
        ?.programmeSpecialty
    ).toEqual("ST6");
  });

  it("should return formRPartA with empty programmespeciality when no programmeMemberships available", () => {
    const traineeProfile = { ...mockTraineeProfile, programmeMemberships: [] };
    expect(
      ProfileToFormRPartAInitialValuesMapping(traineeProfile)
        ?.programmeSpecialty
    ).toEqual("");
  });

  it("should return formRPartA with empty strings when no personal details available", () => {
    const traineeProfile = { ...mockTraineeProfile, personalDetails: null };
    expect(
      ProfileToFormRPartAInitialValuesMapping(traineeProfile)?.forename
    ).toEqual("");
  });
});