import { AxiosResponse } from "axios";
import ApiService from "./apiService";
import { TraineeProfile } from "../models/TraineeProfile";

export interface ITraineeProfileService {
  getTraineeProfile(): Promise<AxiosResponse<TraineeProfile>>;
}

export class TraineeProfileService implements ITraineeProfileService {
  apiService: ApiService;

  constructor() {
    this.apiService = new ApiService();
  }

  async getTraineeProfile(): Promise<AxiosResponse<TraineeProfile>> {
    return this.apiService.get<TraineeProfile>(`/api/contactdetails`);
  }
}
