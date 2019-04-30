import { combineReducers } from "redux";
import devPlans from "./devPlanReducer";

const rootReducer = combineReducers({
  devPlans
});

export default rootReducer;
