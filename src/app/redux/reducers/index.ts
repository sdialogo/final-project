import { combineReducers } from "redux";
import devPlans from "./devPlanReducer";
import employees from "./employeeReducer";

const rootReducer = combineReducers({
  devPlans,
  employees
});

export default rootReducer;
