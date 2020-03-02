import { GET_PERSONAL_DETAILS } from "../actions/types";
import { ProfileService } from "../../services/ProfileService";

const profileService = new ProfileService();

export const fetchPersonDetails = () => (dispatch: (arg0: {}) => any) => {
  profileService
    .getPersonalDetails()
    .then(personData =>
      dispatch({
        type: GET_PERSONAL_DETAILS,
        payload: { personalDetails: personData, isLoaded: true, error: null }
      })
    )
    .catch(error => {
      dispatch({
        type: GET_PERSONAL_DETAILS,
        payload: { personalDetails: null, isLoaded: false, error: error }
      });
    });
};
