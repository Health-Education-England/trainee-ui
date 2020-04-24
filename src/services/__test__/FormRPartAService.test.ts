import { AxiosResponse } from "axios";
import { FormRPartAService } from "../FormRPartAService";
import { submittedForms } from "../../mock-data/submitted-formr-parta";

const mockService = new FormRPartAService();
describe("FormRPartAService", () => {
  it("getTraineeFormRPartA method should return success response", () => {
    const successResponse: Promise<AxiosResponse<any>> = Promise.resolve({
      data: submittedForms,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {}
    });

    jest.spyOn(mockService, "get").mockReturnValue(successResponse);

    expect(mockService.getTraineeFormRPartA()).toEqual(successResponse);
  });

  it("saveTraineeFormRPartA method should return success response", () => {
    const successResponse: Promise<AxiosResponse<any>> = Promise.resolve({
      data: submittedForms[0],
      status: 200,
      statusText: "OK",
      headers: {},
      config: {}
    });

    jest.spyOn(mockService, "post").mockReturnValue(successResponse);

    expect(mockService.saveTraineeFormRPartA(submittedForms[0])).toEqual(
      successResponse
    );
  });
});
