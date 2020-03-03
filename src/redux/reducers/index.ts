import { combineReducers } from "redux";
import personReducer from "./personReducer";

export const rootReducer = combineReducers({
  persons: personReducer
});

export type RootState = ReturnType<typeof rootReducer>;
