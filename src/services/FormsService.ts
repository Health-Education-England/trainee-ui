import { AxiosResponse } from "axios";
import ApiService from "./apiService";
import { FormRPartA } from "../models/FormRPartA";
import { FormRPartB } from "../models/FormRPartB";

export class FormsService extends ApiService {
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

  async saveTraineeFormRPartB(
    formData: FormRPartB
  ): Promise<AxiosResponse<FormRPartB>> {
    return this.post<FormRPartB>("/formr-partb", formData);
  }

  async getTraineeFormRPartB(): Promise<AxiosResponse<FormRPartB[]>> {
    return this.get<FormRPartB[]>(`/formr-partb/${this.traineeTisId}`);
  }
}
