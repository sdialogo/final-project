import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import { sortEmployeeTableContentById } from "../../common/functions";

export default function employeeReducer(
  state: any[] = initialState.employees,
  action: any
) {
  switch (action.type) {
    case types.LOAD_EMPLOYEES_SUCCESS:
      return action.employees;
    case types.ADD_EMPLOYEE:
      return sortEmployeeTableContentById([...state, { ...action.employee }]);
    case types.DELETE_EMPLOYEE:
      const id = action.employeeId;
      return state.filter(employee => employee.id !== id);
    case types.UPDATE_EMPLOYEE:
    //update state here
    default:
      return state;
  }
}
