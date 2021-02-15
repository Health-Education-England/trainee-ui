import { Status } from "./Status";

export interface Placement {
  placementTisId: string;
  startDate: Date;
  endDate: Date;
  site: string;
  siteLocation: string;
  grade: string;
  specialty: string;
  placementType: string;
  employingBody: string;
  trainingBody: string;
  wholeTimeEquivalent: string;
  status: Status;
}
