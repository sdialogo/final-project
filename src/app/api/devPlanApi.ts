import { handleResponse, handleError } from "./apiUtils";
import { TDevPlan } from "../common/types";

const baseUrl = process.env.API_URL + "/devPlans/";

export function getDevPlans() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveDevPlan(devPlan: TDevPlan) {
  return fetch(baseUrl + "create", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(devPlan)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteDevPlan(devPlanId: number) {
  return fetch(baseUrl + devPlanId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}

export function updateDevPlan(devPlan: TDevPlan) {
  return fetch(baseUrl + devPlan.id, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(devPlan)
  })
    .then(handleResponse)
    .catch(handleError);
}
