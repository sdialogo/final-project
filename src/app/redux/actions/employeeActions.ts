import * as types from "./actionTypes";
import * as employeeApi from "../../api/employeeApi";
import { TEmployee } from "../../common/types";

export function loadEmployeesSuccess(employees: TEmployee[]) {
  return { type: types.LOAD_EMPLOYEES_SUCCESS, employees };
}

export function loadEmployees() {
  return function(dispatch: Function) {
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

export function addEmployee(employee: TEmployee) {
  return { type: types.ADD_EMPLOYEE, employee };
}

export function deleteEmployee(employeeId: number) {
  return { type: types.DELETE_EMPLOYEE, employeeId };
}
