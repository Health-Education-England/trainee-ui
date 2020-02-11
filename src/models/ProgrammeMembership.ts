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
  Current = "CURRENT",
  Past = "PAST",
  Future = "FUTURE"
}
