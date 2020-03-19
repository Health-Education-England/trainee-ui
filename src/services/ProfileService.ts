import { AxiosResponse } from "axios";
import ApiService from "./apiService";
import { TraineeProfile } from "../models/TraineeProfile";

export interface ITraineeProfileService {
  getTraineeProfile(): Promise<AxiosResponse<TraineeProfile>>;
}

export class TraineeProfileService implements ITraineeProfileService {
  constructor() {
    super("/trainee/api");
  }

  async getTraineeProfile(): Promise<AxiosResponse<TraineeProfile>> {
    return this.get<PersonalDetails>("/trainee-profile");
  }
}
