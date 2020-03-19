import ApiService from "./apiService";
import { AxiosResponse } from "axios";

export class TraineeReferenceService {
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService();
  }

  getGenders(): Promise<AxiosResponse<any[]>> {
    return this.apiService.get("http://localhost:8205/api/gender");
  }

  getQualifications(): Promise<AxiosResponse<any[]>> {
    return this.apiService.get("http://localhost:8205/api/qualification");
  }

  getColleges(): Promise<AxiosResponse<any[]>> {
    return this.apiService.get("http://localhost:8205/api/college");
  }

  getLocalOffices(): Promise<AxiosResponse<any[]>> {
    return this.apiService.get("http://localhost:8205/api/localoffice");
  }

  getImmigrationStatuses(): string[] {
    return ["Resident", "Settled", "Work permit required", "Other"];
  }

  getDeclarations(): string[] {
    return [
      "I have been appointed to a programme leading to award of CCT",
      "I will be seeking specialist registration by application for a CESR",
      "I will be seeking specialist registration by application for a CESR CP",
      "I will be seeking specialist registration by application for a CEGPR",
      "I will be seeking specialist registration by application for a CEGPR CP",
      "I am a CORE trainee, not yet eligible for CCT"
    ];
  }
}
