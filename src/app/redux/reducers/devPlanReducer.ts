import * as types from "../actions/actionTypes";

export default function devPlanReducer(state: any[] = [], action: any) {
  switch (action.type) {
    case types.ADD_DEVPLAN:
      return [...state, { ...action.devPlan }];
    default:
      return state;
  }
}
