import { combineReducers } from "redux";
import TraineeProfileReducer from "./trainee-profile-reducer";
import ReferenceDataReducer from "./reference-data-reducer";
import {
  LoadFormRPartAReducer,
  LoadFormRPartAListReducer
} from "./formr-parta-reducer";
import {
  LoadFormRPartBReducer,
  LoadFormRPartBListReducer,
  LoadNewFormRPartBReducer
} from "./formr-partb-reducer";

export const rootReducer = combineReducers({
  profile: TraineeProfileReducer,
  referenceData: ReferenceDataReducer,
  formRPartAView: LoadFormRPartAReducer,
  formRPartAList: LoadFormRPartAListReducer,
  newFormRPartB: LoadNewFormRPartBReducer,
  formRPartBView: LoadFormRPartBReducer,
  formRPartBList: LoadFormRPartBListReducer
});

export type RootState = ReturnType<typeof rootReducer>;
