import { TEmployee, TDevPlan } from "./types";

export function getFullName(data: TEmployee) {
  let fullName = data.firstName
    .concat(" ")
    .concat(data.middleName)
    .concat(" ")
    .concat(data.lastName);

  return fullName;
}

export function findDataById(id: any, arr: TDevPlan[]): TDevPlan {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return arr[i];
    }
  }

  return {
    id: "",
    title: "",
    description: "",
    statusCode: "",
    employeeId: "",
    employeeName: "",
    dueDate: ""
  };
}
