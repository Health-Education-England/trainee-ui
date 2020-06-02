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
  work: Work[];
  sicknessAbsence: number;
  parentalLeave: number;
  careerBreaks: number;
  paidLeave: number;
  unauthorisedLeave: number;
  otherLeave: number;
  totalLeave: number;
  isHonest: boolean | undefined;
  isHealthy: boolean | undefined;
  isWarned: boolean | undefined;
  isComplying: boolean | undefined;
  healthStatement: string;
  submissionDate: Date | null;
  lastModifiedDate: Date | null;
}

export interface Work {
  typeOfWork: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  trainingPost: string;
  site: string;
  siteLocation: string;
}
