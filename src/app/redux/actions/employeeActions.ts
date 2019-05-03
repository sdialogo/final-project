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

export function addEmployee(employee: any) {
  return { type: types.ADD_EMPLOYEE, employee };
}

export function deleteEmployee(employeeId: any) {
  return { type: types.DELETE_EMPLOYEE, employeeId };
}
