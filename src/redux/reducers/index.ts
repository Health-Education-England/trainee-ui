import { combineReducers } from "redux";
import TraineeProfileReducer from "./trainee-profile-reducer";
import ReferenceDataReducer from "./reference-data-reducer";
import {
  LoadFormRPartAReducer,
  LoadFormRPartAListReducer
} from "./formr-parta-reducer";
import {
  FormRPartBReducer,
  FormRPartBListReducer
} from "./formr-partb-reducer";

export const rootReducer = combineReducers({
  profile: TraineeProfileReducer,
  referenceData: ReferenceDataReducer,
  formRPartAView: LoadFormRPartAReducer,
  formRPartAList: LoadFormRPartAListReducer,
  formRPartB: FormRPartBReducer,
  formRPartBList: FormRPartBListReducer
});

export type RootState = ReturnType<typeof rootReducer>;
