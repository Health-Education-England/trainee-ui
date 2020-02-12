import axios, { AxiosResponse } from "axios";
import { PersonalDetails } from "../models/PersonalDetails";

export interface IProfileService {
  getPersonalDetails(): Promise<AxiosResponse<PersonalDetails>>;
}

export class ProfileService implements IProfileService {
  config = {
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000"
    }
  };

  baseUri = "http://localhost:8203/";

  // Temporarily hard code the trainee object ID to map with the ID in docker compose file
  profileDetailsUrl = `${this.baseUri}api/contactdetails/5e43d4417fcae83918012479`;

  async getPersonalDetails(): Promise<AxiosResponse<PersonalDetails>> {
    return axios.get<PersonalDetails>(this.profileDetailsUrl, this.config);
  }
}
