import * as types from "./actionTypes";
import * as devPlanApi from "../../api/devPlanApi";
import { TDevPlan } from "../../common/types";

export function loadDevPlansSuccess(devPlans: TDevPlan[]) {
  return { type: types.LOAD_DEVPLANS_SUCCESS, devPlans };
}

export function addDevPlanSuccess(devPlan: TDevPlan) {
  return { type: types.ADD_DEVPLAN, devPlan };
}

export function updateDevPlanSuccess(devPlan: TDevPlan) {
  return { type: types.UPDATE_DEVPLAN, devPlan };
}

export function deleteDevPlanSuccess(devPlanId: number) {
  return { type: types.DELETE_DEVPLAN, devPlanId };
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
  return function(dispatch: Function) {
    return devPlanApi
      .saveDevPlan(devPlan)
      .then(saveDevPlan => {
        dispatch(addDevPlanSuccess(saveDevPlan));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function deleteDevPlan(devPlanId: number) {
  return function(dispatch: Function) {
    return devPlanApi
      .deleteDevPlan(devPlanId)
      .then(id => {
        dispatch(deleteDevPlanSuccess(devPlanId));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function updateDevPlan(devPlan: TDevPlan) {
  return function(dispatch: Function) {
    return devPlanApi
      .updateDevPlan(devPlan)
      .then(updatedDevPlan => {
        dispatch(updateDevPlanSuccess(updatedDevPlan));
      })
      .catch(error => {
        throw error;
      });
  };
}
