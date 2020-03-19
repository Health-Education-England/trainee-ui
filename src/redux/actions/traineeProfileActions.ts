import {
  LOAD_TRAINEE_PROFILE,
  LOAD_TRAINEE_PROFILE_FAILURE,
  LOAD_TRAINEE_PROFILE_SUCCESS,
  ActionType
} from "../types";
import { TraineeProfileService } from "../../services/TraineeProfileService";

const profileService = new TraineeProfileService();

export const fetchTraineeProfile = () => (
  dispatch: (action: ActionType) => any
) => {
  profileService
    .getTraineeProfile()
    .then(response =>
      dispatch({
        type: LOAD_TRAINEE_PROFILE_SUCCESS,
        payload: response.data
      })
    )
    .catch(error =>
      dispatch({
        type: LOAD_TRAINEE_PROFILE_FAILURE,
        payload: error
      })
    );

  return dispatch({
    type: LOAD_TRAINEE_PROFILE,
    payload: null
  });
};

export default fetchTraineeProfile;
