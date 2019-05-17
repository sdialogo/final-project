import * as types from "./actionTypes";
import * as devPlanApi from "../../api/devPlanApi";
import { TDevPlan } from "../../common/types";

export function loadDevPlansSuccess(devPlans: TDevPlan[]) {
  return { type: types.LOAD_DEVPLANS_SUCCESS, devPlans };
}

export function loadDevPlans() {
  return function(dispatch: Function) {
    return devPlanApi
      .getDevPlans()
      .then(devPlans => {
        dispatch(loadDevPlansSuccess(devPlans));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function addDevPlan(devPlan: TDevPlan) {
  return { type: types.ADD_DEVPLAN, devPlan };
}

export function deleteDevPlan(devPlanId: number) {
  return { type: types.DELETE_DEVPLAN, devPlanId };
}

export function updateDevPlan(devPlan: TDevPlan) {
  return { type: types.UPDATE_DEVPLAN, devPlan };
}
