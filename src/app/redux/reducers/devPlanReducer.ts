import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function devPlanReducer(
  state: any[] = initialState.devPlans,
  action: any
) {
  switch (action.type) {
    case types.ADD_DEVPLAN:
      return [...state, { ...action.devPlan }];
    case types.DELETE_DEVPLAN:
      const id = action.devPlanId;
      return state.filter(devPlan => devPlan.id !== id);
    case types.LOAD_DEVPLANS_SUCCESS:
      return action.devPlans;
    default:
      return state;
  }
}
