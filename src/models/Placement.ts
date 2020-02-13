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

export enum Status {
  Current = "CURRENT",
  Past = "PAST",
  Future = "FUTURE"
}
