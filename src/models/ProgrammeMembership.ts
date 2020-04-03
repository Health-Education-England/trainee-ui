import { Status } from "./Status";

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
