import { AxiosResponse } from "axios";
import ApiService from "./apiService";
import { TraineeProfile } from "../models/TraineeProfile";

export class TraineeProfileService {
  private apiService: ApiService;
  constructor() {
    super("/trainee/api");
  }

  async getTraineeProfile(): Promise<AxiosResponse<TraineeProfile>> {
    return this.apiService.get<TraineeProfile>(
      `/profile/api/trainee-profile/5e7a30838a68be399cc0dff8`
    );
  }
}
