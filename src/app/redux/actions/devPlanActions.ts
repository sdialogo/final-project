import * as types from "./actionTypes";
import * as devPlanApi from "../../api/devPlanApi";

export function addDevPlan(devPlan: any) {
  return { type: types.ADD_DEVPLAN, devPlan };
}

export function loadDevPlansSuccess(devPlans: any) {
  return { type: types.LOAD_DEVPLANS_SUCCESS, devPlans };
}

export function loadDevPlans() {
  return function(dispatch: any) {
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
