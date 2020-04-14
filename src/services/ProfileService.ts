import { AxiosResponse } from "axios";
import { PersonalDetails } from "../models/PersonalDetails";
import ApiService from "./apiService";

export interface IProfileService {
  getPersonalDetails(): Promise<AxiosResponse<PersonalDetails>>;
}

export class ProfileService extends ApiService implements IProfileService {
  constructor() {
    super("/trainee/api");
  }

  async getPersonalDetails(): Promise<AxiosResponse<PersonalDetails>> {
    return this.get<PersonalDetails>("/contactdetails");
  }
}
