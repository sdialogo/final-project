import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function employeeReducer(
  state: any[] = initialState.employees,
  action: any
) {
  switch (action.type) {
    case types.LOAD_EMPLOYEES_SUCCESS:
      return action.employees;
    case types.ADD_EMPLOYEE:
      return [...state, { ...action.employee }];
    case types.DELETE_EMPLOYEE:
      const id = action.employeeId;
      return state.filter(employee => employee.id !== id);
    default:
      return state;
  }
}
