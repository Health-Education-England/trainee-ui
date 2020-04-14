import { AxiosResponse } from "axios";
import ApiService from "./apiService";
import { TraineeProfile } from "../models/TraineeProfile";

export class TraineeProfileService {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }

  async getTraineeProfile(): Promise<AxiosResponse<TraineeProfile>> {
    return this.apiService.get<TraineeProfile>(
      `/profile/api/trainee-profile/${this.apiService.traineeTisId}`
    );
  }
}
