import { handleResponse, handleError } from "./apiUtils";
import { TEmployee } from "../common/types";

const baseUrl = process.env.API_URL + "/employees/";

export function getEmployees() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveEmployee(employee: TEmployee) {
  return fetch(baseUrl + "create", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(employee)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteEmployee(employeeId: number) {
  return fetch(baseUrl + employeeId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}

export function updateEmployee(employee: TEmployee) {
  return fetch(baseUrl + employee.id, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(employee)
  })
    .then(handleResponse)
    .catch(handleError);
}
