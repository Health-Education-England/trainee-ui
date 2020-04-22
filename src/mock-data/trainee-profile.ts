import { PersonalDetails } from "../models/PersonalDetails";
import { TraineeProfile } from "../models/TraineeProfile";

const mockPersonalDetails: PersonalDetails = {
  surname: "mock string",
  forenames: "mock string",
  knownAs: "mock string",
  maidenName: "mock string",
  title: "mock string",
  personOwner: "mock string",
  dateOfBirth: new Date(),
  gender: "mock string",
  qualification: "mock string",
  dateAttained: new Date(),
  medicalSchool: "mock string",
  telephoneNumber: "mock string",
  mobileNumber: "mock string",
  email: "mock string",
  address1: "mock string",
  address2: "mock string",
  address3: "mock string",
  address4: "mock string",
  postCode: "mock string",
  gmcNumber: "mock string",
  gmcStatus: "mock string",
  gdcNumber: "mock string",
  gdcStatus: "mock string",
  publicHealthNumber: "mock string",
  eeaResident: "mock string",
  permitToWork: "mock string",
  settled: "mock string",
  visaIssued: "mock string",
  detailsNumber: "mock string"
};

export const mockTraineeProfile: TraineeProfile = {
  traineeTisId: "123",
  personalDetails: mockPersonalDetails,
  programmeMemberships: [],
  placements: []
};
