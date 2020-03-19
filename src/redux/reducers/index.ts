import { combineReducers } from "redux";
import personReducer from "./person-reducer";
import formRPartAReducer from "./formr-parta-reducer";

export const rootReducer = combineReducers({
  person: personReducer,
  formRPartA: formRPartAReducer
});

export type RootState = ReturnType<typeof rootReducer>;
