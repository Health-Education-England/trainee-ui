import { rootReducer } from "./reducers";
import { TraineeProfile } from "../models/TraineeProfile";

export const LOAD_TRAINEE_PROFILE_SUCCESS = "LOAD_TRAINEE_PROFILE_SUCCESS";
export const LOAD_TRAINEE_PROFILE_FAILURE = "LOAD_TRAINEE_PROFILE_FAILURE";

export type RootState = ReturnType<typeof rootReducer>;

export interface PersonActionType {
  type: string;
  payload: any;
}

export interface PersonState {
  traineeProfile: TraineeProfile | null;
  isLoaded: boolean;
  error: any;
}
