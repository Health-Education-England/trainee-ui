import { rootReducer } from "./reducers";
import { TraineeProfile } from "../models/TraineeProfile";
import { FormRPartA } from "../models/FormRPartA";
import { KeyValue } from "../models/KeyValue";

export const LOAD_TRAINEE_PROFILE_SUCCESS = "LOAD_TRAINEE_PROFILE_SUCCESS";
export const LOAD_TRAINEE_PROFILE_FAILURE = "LOAD_TRAINEE_PROFILE_FAILURE";
export const LOAD_INITIAL_VALUES_SUCCESS = "LOAD_INITIAL_VALUES_SUCCESS";
export const LOAD_INITIAL_VALUES_FAILURE = "LOAD_INITIAL_VALUES_FAILURE";
export const LOAD_REFERENCE_GENDER_SUCCESS = "LOAD_REFERENCE_GENDER_SUCCESS";
export const LOAD_REFERENCE_GENDER_FAILURE = "LOAD_REFERENCE_GENDER_FAILURE";
export const LOAD_REFERENCE_COLLEGES_SUCCESS =
  "LOAD_REFERENCE_COLLEGES_SUCCESS";
export const LOAD_REFERENCE_COLLEGES_FAILURE =
  "LOAD_REFERENCE_COLLEGES_FAILURE";
export const LOAD_REFERENCE_QUALIFICATIONS_SUCCESS =
  "LOAD_REFERENCE_QUALIFICATIONS_SUCCESS";
export const LOAD_REFERENCE_QUALIFICATIONS_FAILURE =
  "LOAD_REFERENCE_QUALIFICATIONS_FAILURE";
export const LOAD_REFERENCE_LOCAL_OFFICES_SUCCESS =
  "LOAD_REFERENCE_LOCAL_OFFICES_SUCCESS";
export const LOAD_REFERENCE_LOCAL_OFFICES_FAILURE =
  "LOAD_REFERENCE_LOCAL_OFFICES_FAILURE";
export const LOAD_REFERENCE_GRADES_SUCCESS = "LOAD_REFERENCE_GRADES_SUCCESS";
export const LOAD_REFERENCE_GRADES_FAILURE = "LOAD_REFERENCE_GRADES_FAILURE";

export type RootState = ReturnType<typeof rootReducer>;

export interface ActionType {
  type: string;
  payload: any;
}

export interface PersonState {
  traineeProfile: TraineeProfile | null;
  isLoaded: boolean;
}

export interface GenericOwnProps {
  history: any;
  location: any;
}

export interface FormRPartAState {
  intialFormValues: FormRPartA | null;
  genderOptions: KeyValue[];
  colleges: KeyValue[];
  localOffices: KeyValue[];
  qualifications: KeyValue[];
  grades: KeyValue[];
  isLoaded: boolean;
}
