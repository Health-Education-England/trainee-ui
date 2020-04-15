import { AxiosResponse } from "axios";
import ApiService from "./apiService";
import { FormRPartA } from "../models/FormRPartA";

export class FormRPartAService extends ApiService {
  constructor() {
    super("/forms/api");
  }

  async saveTraineeFormRPartA(
    formData: FormRPartA
  ): Promise<AxiosResponse<FormRPartA>> {
    return this.post<FormRPartA>("/formr-parta", formData);
  }

  async getTraineeFormRPartA(): Promise<AxiosResponse<FormRPartA[]>> {
    return this.get<FormRPartA[]>(`/formr-parta/${this.traineeTisId}`);
  }
}
