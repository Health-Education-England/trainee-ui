import ApiService from "./apiService";
import { AxiosResponse } from "axios";

export class TraineeReferenceService {
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService();
  }

  getGenders(): Promise<AxiosResponse<any>> {
    return this.apiService.get("/reference/api/gender");
  }

  getQualifications(): Promise<AxiosResponse<any>> {
    return this.apiService.get("/reference/api/qualification");
  }

  getColleges(): Promise<AxiosResponse<any>> {
    return this.apiService.get("/reference/api/college");
  }

  getLocalOffices(): Promise<AxiosResponse<any>> {
    return this.apiService.get("/reference/api/localoffice");
  }

  getTrainingGrades(): Promise<AxiosResponse<any>> {
    return this.apiService.get("/reference/api/grade");
  }
}
