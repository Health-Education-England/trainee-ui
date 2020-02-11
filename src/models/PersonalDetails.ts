import { ProgrammeMembership } from "./ProgrammeMembership";

export interface PersonalDetails {
  id: string;
  traineeTisId: string;
  surname: string;
  forenames: string;
  knownAs: string;
  maidenName: string;
  title: string;
  telephoneNumber: string;
  mobileNumber: string;
  email: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  postCode: string;
  gmcNumber: string;
  gmcStatus: string;
  gdcNumber: string;
  gdcStatus: string;
  publicHealthNumber: string;
  eeaResident: string;
  permitToWork: string;
  settled: string;
  visaIssued: string;
  detailsNumber: string;
  programmeMemberships: ProgrammeMembership[];
}
