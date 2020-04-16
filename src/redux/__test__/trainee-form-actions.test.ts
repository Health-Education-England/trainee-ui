import { loadFormRPartAInitialValues } from "../actions/trainee-form-actions";
import { TraineeProfileService } from "../../services/TraineeProfileService";
import { TraineeReferenceService } from "../../services/TraineeReferenceService";

jest.mock("../../services/TraineeProfileService");
jest.mock("../../services/TraineeReferenceService");

describe("fetchTraineeFormRPartAInitialValues", () => {
  it("should create profile and reference service instances", () => {
    loadFormRPartAInitialValues();
    expect(TraineeProfileService).toHaveBeenCalled();
    expect(TraineeReferenceService).toHaveBeenCalled();
  });
});
