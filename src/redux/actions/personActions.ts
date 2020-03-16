import {
  LOAD_TRAINEE_PROFILE,
  LOAD_TRAINEE_PROFILE_FAILURE,
  LOAD_TRAINEE_PROFILE_SUCCESS,
  PersonActionType
} from "../types";
import { ProfileService } from "../../services/ProfileService";

const profileService = new ProfileService();

export const fetchPersonalDetails = () => (
  dispatch: (action: PersonActionType) => any
) => {
  profileService
    .getPersonalDetails()
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

export default fetchPersonalDetails;
