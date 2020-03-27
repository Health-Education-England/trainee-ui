import { rootReducer } from "./reducers";
import { TraineeProfile } from "../models/TraineeProfile";
import { FormRPartA } from "../models/FormRPartA";

export const LOAD_TRAINEE_PROFILE = "LOAD_TRAINEE_PROFILE";
export const LOAD_TRAINEE_PROFILE_SUCCESS = "LOAD_TRAINEE_PROFILE_SUCCESS";
export const LOAD_TRAINEE_PROFILE_FAILURE = "LOAD_TRAINEE_PROFILE_FAILURE";
export const LOAD_FORMR_INITIALVALUES = "LOAD_FORMR_INITIALVALUES";
export const LOAD_FORMR_INITIALVALUES_SUCCESS =
  "LOAD_FORMR_INITIALVALUES_SUCCESS";
export const LOAD_FORMR_INITIALVALUES_FAILURE =
  "LOAD_FORMR_INITIALVALUES_FAILURE";

export type RootState = ReturnType<typeof rootReducer>;

export interface ActionType {
  type: string;
  payload: any;
}

export interface PersonState {
  traineeProfile: TraineeProfile | null;
  isLoaded: boolean;
  error: any;
}

export interface FormRPartAState {
  intialFormValues: FormRPartA | null;
  isLoaded: boolean;
  error: any;
}
