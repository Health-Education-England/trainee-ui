import { GET_PERSONAL_DETAILS } from "../actions/types";
import { ProfileService } from "../../services/ProfileService";

const profileService = new ProfileService();

export const fetchPersonDetails = () => (dispatch: (arg0: {}) => any) => {
  profileService
    .getPersonalDetails()
    .then(response =>
      dispatch({
        type: GET_PERSONAL_DETAILS,
        payload: { personalDetails: response.data, isLoaded: true, error: null }
      })
    )
    .catch(error => {
      dispatch({
        type: GET_PERSONAL_DETAILS,
        payload: { personalDetails: null, isLoaded: false, error: error }
      });
    });

  return dispatch({
    type: GET_PERSONAL_DETAILS,
    payload: { personalDetails: null, isLoaded: false, error: null }
  });
};

export default fetchPersonDetails;
