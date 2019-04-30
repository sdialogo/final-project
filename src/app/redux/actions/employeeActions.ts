import * as types from "./actionTypes";
import * as employeeApi from "../../api/employeeApi";

export function loadEmployeesSuccess(employees: any) {
  return { type: types.LOAD_EMPLOYEES_SUCCESS, employees };
}

export function loadEmployees() {
  return function(dispatch: any) {
    return employeeApi
      .getEmployees()
      .then(employees => {
        dispatch(loadEmployeesSuccess(employees));
      })
      .catch(error => {
        throw error;
      });
  };
}
