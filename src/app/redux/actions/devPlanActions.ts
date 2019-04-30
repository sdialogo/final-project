import * as types from "./actionTypes";

export function addDevPlan(devPlan: any) {
  return { type: types.ADD_DEVPLAN, devPlan };
}
