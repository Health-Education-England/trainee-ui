import ApiService from "./apiService";
import { AxiosResponse } from "axios";

export class TraineeReferenceService extends ApiService {
  constructor() {
    super("/reference/api");
  }

  getGenders(): Promise<AxiosResponse<any>> {
    return this.get("/gender");
  }

  getQualifications(): Promise<AxiosResponse<any>> {
    return this.get("/qualification");
  }

  getColleges(): Promise<AxiosResponse<any>> {
    return this.get("/college");
  }

  getLocalOffices(): Promise<AxiosResponse<any>> {
    return this.get("/localoffice");
  }

  getTrainingGrades(): Promise<AxiosResponse<any>> {
    return this.get("/grade");
  }

  getImmigrationStatuses(): Promise<AxiosResponse<any>> {
    return this.get("/immigration-status");
  }
}
