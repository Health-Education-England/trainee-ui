import { combineReducers } from "redux";
import TraineeProfileReducer from "./trainee-profile-reducer";
import ReferenceDataReducer from "./reference-data-reducer";
import {
  LoadFormRPartAReducer,
  LoadFormRPartAListReducer
} from "./formr-parta-reducer";

export const rootReducer = combineReducers({
  profile: TraineeProfileReducer,
  referenceData: ReferenceDataReducer,
  formRPartAView: LoadFormRPartAReducer,
  formRPartAList: LoadFormRPartAListReducer
});

export type RootState = ReturnType<typeof rootReducer>;
