import { combineReducers } from "redux";
import PersonReducer from "./person-reducer";
import FormRPartAReducer from "./formr-parta-reducer";
import {
  LoadFormRPartAReducer,
  LoadFormRPartAListReducer
} from "./load-formr-parta-reducer";

export const rootReducer = combineReducers({
  person: PersonReducer,
  formRPartA: FormRPartAReducer,
  formRPartAView: LoadFormRPartAReducer,
  formRPartAList: LoadFormRPartAListReducer
});

export type RootState = ReturnType<typeof rootReducer>;
