import { rootReducer } from "./reducers";
import { TraineeProfile } from "../models/TraineeProfile";
import { FormRPartA } from "../models/FormRPartA";
import { KeyValue } from "../models/KeyValue";

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
  genders: KeyValue[];
  colleges: KeyValue[];
  localOffices: KeyValue[];
  qualifications: KeyValue[];
  grades: KeyValue[];
  immigrationStatuses: KeyValue[];
  isLoaded: boolean;
}
