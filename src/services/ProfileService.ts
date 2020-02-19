import { AxiosResponse } from "axios";
import { PersonalDetails } from "../models/PersonalDetails";
import ApiService from "./apiService";

export interface IProfileService {
  getPersonalDetails(): Promise<AxiosResponse<PersonalDetails>>;
}

export class ProfileService implements IProfileService {
  apiService: ApiService;

  constructor() {
    this.apiService = new ApiService();
  }

  async getPersonalDetails(): Promise<AxiosResponse<PersonalDetails>> {
    return this.apiService.get<PersonalDetails>(`/api/contactdetails`);
  }
}
