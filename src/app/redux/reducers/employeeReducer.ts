import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function employeeReducer(
  state: any[] = initialState.employees,
  action: any
) {
  switch (action.type) {
    case types.LOAD_EMPLOYEES_SUCCESS:
      return action.employees;
    default:
      return state;
  }
}
