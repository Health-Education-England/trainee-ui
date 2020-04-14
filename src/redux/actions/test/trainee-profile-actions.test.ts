import { TraineeProfileService } from "../../../services/TraineeProfileService";
import fetchTraineeProfile from "../trainee-profile-actions";

jest.mock("../../../services/TraineeProfileService");

describe("fetchTraineeProfile", () => {
  it("should create profile and reference service instances", () => {
    fetchTraineeProfile();
    expect(TraineeProfileService).toHaveBeenCalled();
  });
});
