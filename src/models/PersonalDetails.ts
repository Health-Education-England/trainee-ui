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

export interface ProgrammeMembership {
  programmeTisId: string;
  programmeName: string;
  programmeNumber: string;
  managingDeanery: string;
  status: Status;
  startDate: Date;
  endDate: Date;
  curricula: curriculm[];
}

export interface curriculm {
  curriculumTisId: string;
  curriculumName: string;
}

export enum Status {
  Current = 'CURRENT',
  Past = 'PAST',
  Future = 'FUTURE'
}
