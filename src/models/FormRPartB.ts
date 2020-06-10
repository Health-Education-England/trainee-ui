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
  isHonest: boolean | string;
  isHealthy: boolean | string;
  isWarned: boolean | string;
  isComplying: boolean | string;
  healthStatement: string;
  havePreviousDeclarations: boolean | string;
  previousDeclarations: Declaration[];
  previousDeclarationsSummary: string;
  haveCurrentDeclarations: boolean | string;
  currentDeclarations: Declaration[];
  currentDeclarationsSummary: string;
  submissionDate: Date | null;
  lastModifiedDate: Date | null;
}

export interface Declaration {
  declarationType: DeclarationType;
  DateOfEntry: Date | undefined;
  Title: string;
  LocationOfEntry: string;
}

export enum DeclarationType {
  SignificantEvent = "Significant event",
  Complaint = "Complaint",
  OtherInvestigation = "Other investigation"
}

export interface Work {
  typeOfWork: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  trainingPost: string;
  site: string;
  siteLocation: string;
}
