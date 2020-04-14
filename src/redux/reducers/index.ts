import { combineReducers } from "redux";
import PersonReducer from "./person-reducer";
import FormRPartAReducer from "./formr-parta-reducer";

export const rootReducer = combineReducers({
  person: PersonReducer,
  formRPartA: FormRPartAReducer
});

export type RootState = ReturnType<typeof rootReducer>;
