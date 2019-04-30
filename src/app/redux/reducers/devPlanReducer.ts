export default function devPlanReducer(state: any[] = [], action: any) {
  switch (action.type) {
    case "ADD_DEVPLAN":
      return [...state, { ...action.devPlan }];
    default:
      return state;
  }
}
