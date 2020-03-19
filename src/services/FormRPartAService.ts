import { AxiosResponse } from "axios";
import ApiService from "./apiService";
import { FormRPartAModel } from "../models/FormRPartAModel";

export class FormRPartAService {
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService();
  }

  async saveTraineeFormRPartA(
    formData: FormRPartAModel
  ): Promise<AxiosResponse<FormRPartAModel>> {
    formData.id = "5e7a30838a68be399cc0dff8";
    return this.apiService.post<FormRPartAModel>(
      `http://localhost:8207/api/formr-parta`,
      formData
    );
  }
}
