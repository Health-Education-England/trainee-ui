export interface FormRPartB {
  id?: string;
  traineeTisId?: string;
  forename: string;
  surname: string;
  gmcNumber: string;
  email: string | null;
  localOfficeName: string;
  previousRevalBody: string;
  currentRevalDate: Date;
  previousRevalDate: Date;
  programmeSpecialty: string;
  dualSpecialty: string;
}
