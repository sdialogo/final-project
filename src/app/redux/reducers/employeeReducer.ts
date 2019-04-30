import * as types from "../actions/actionTypes";

export default function employeeReducer(state: any[] = [], action: any) {
  switch (action.type) {
    case types.LOAD_EMPLOYEES_SUCCESS:
      return action.employees;
    default:
      return state;
  }
}
