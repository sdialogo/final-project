import * as types from "./actionTypes";
import * as employeeApi from "../../api/employeeApi";
import { TEmployee } from "../../common/types";

export function loadEmployeesSuccess(employees: TEmployee[]) {
  return { type: types.LOAD_EMPLOYEES_SUCCESS, employees };
}

export function addEmployeeSuccess(employee: TEmployee) {
  return { type: types.ADD_EMPLOYEE, employee };
}

export function updateEmployeeSuccess(employee: TEmployee) {
  return { type: types.UPDATE_EMPLOYEE, employee };
}

export function deleteEmployeeSuccess(employeeId: number) {
  return { type: types.DELETE_EMPLOYEE, employeeId };
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
  return function(dispatch: Function) {
    return employeeApi
      .saveEmployee(employee)
      .then(saveEmployee => {
        dispatch(addEmployeeSuccess(saveEmployee));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function deleteEmployee(employeeId: number) {
  return function(dispatch: Function) {
    return employeeApi
      .deleteEmployee(employeeId)
      .then(id => {
        dispatch(deleteEmployeeSuccess(employeeId));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function updateEmployee(employee: TEmployee) {
  return function(dispatch: Function) {
    return employeeApi
      .updateEmployee(employee)
      .then(updatedEmployee => {
        dispatch(updateEmployeeSuccess(updatedEmployee));
      })
      .catch(error => {
        throw error;
      });
  };
}
