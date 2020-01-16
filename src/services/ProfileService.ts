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

  profileDetailsUrl = `${this.baseUri}api/contactdetails/5e1c4ef8bef65554dca070fc`;

  async getPersonalDetails(): Promise<AxiosResponse<PersonalDetails>> {
    return axios.get<PersonalDetails>(this.profileDetailsUrl, this.config);
  }
}
