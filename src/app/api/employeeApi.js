import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/employees/";

export function getEmployees() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
