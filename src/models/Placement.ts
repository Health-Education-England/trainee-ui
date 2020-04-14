import { Status } from "./Status";

export interface Placement {
  placementTisId: string;
  startDate: Date;
  endDate: Date;
  site: string;
  grade: string;
  specialty: string;
  placementType: string;
  status: Status;
}
