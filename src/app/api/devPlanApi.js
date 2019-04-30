import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/devPlans/";

export function getDevPlans() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveDevPlan(devPlan) {
  return fetch(baseUrl + (devPlan.id || ""), {
    method: devPlan.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(devPlan)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteDevPlan(devPlanId) {
  return fetch(baseUrl + devPlanId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
