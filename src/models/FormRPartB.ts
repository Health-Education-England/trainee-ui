export interface FormRPartB {
  id?: string;
  traineeTisId?: string;
  forename: string;
  surname: string;
  gmcNumber: string;
  email: string;
  localOfficeName: string;
  prevRevalBody: string;
  currRevalDate: Date | undefined;
  prevRevalDate: Date | undefined;
  programmeSpecialty: string;
  dualSpecialty: string;
  submissionDate: string;
  lastModifiedDate: string;
}
