import { combineReducers } from "redux";
import personReducer from "./person-reducer";

export const rootReducer = combineReducers({
  persons: personReducer
});
