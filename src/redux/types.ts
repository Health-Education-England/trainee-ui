import { rootReducer } from "./reducers";
import { PersonalDetails } from "../models/PersonalDetails";

export const LOAD_TRAINEE_PROFILE = "LOAD_TRAINEE_PROFILE";
export const LOAD_TRAINEE_PROFILE_SUCCESS = "LOAD_TRAINEE_PROFILE_SUCCESS";
export const LOAD_TRAINEE_PROFILE_FAILURE = "LOAD_TRAINEE_PROFILE_FAILURE";

export type RootState = ReturnType<typeof rootReducer>;

export interface PersonActionType {
  type: string;
  payload: any;
}

export interface PersonState {
  personalDetails: PersonalDetails | null;
  isLoaded: boolean;
  error: any;
}