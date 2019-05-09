import { TEmployee, TDevPlan, TDevPlanError } from "./types";

let errorList: TDevPlanError = [
  { isTitleError: false, titleError: "" },
  { isDescError: false, descError: "" },
  { isAssigneeError: false, assigneeError: "" },
  { isStatusError: false, statusError: "" },
  { isDueDateError: false, dueDateError: "" }
];

let devPlanSchema = {
  properties: {
    title: {
      type: "string",
      minLength: 1
    },
    description: {
      type: "string",
      minLength: 1
    },
    employeeId: {
      type: "string",
      minLength: 1
    },
    statusCode: {
      type: "string",
      minLength: 1
    },
    dueDate: {
      type: "string",
      minLength: 1
    }
  },
  required: ["title", "description", "employeeId", "statusCode", "dueDate"]
};

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

export function findEmployeeById(id: any, arr: TEmployee[]): TEmployee {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return arr[i];
    }
  }

  return {
    id: "",
    firstName: "",
    lastName: "",
    middleName: "",
    fullName: "",
    archived: false,
    hireDate: ""
  };
}

export function validateDevPlan(data: TDevPlan) {
  console.log("Validating dev plan...");

  var Ajv = require("ajv");
  var ajv = Ajv({ allErrors: true });
  var valid = ajv.validate(devPlanSchema, data);
  let isValid;

  if (valid) {
    isValid = true;
  } else {
    isValid = false;
    ajv.errors.map((error: any) => {
      if (error.dataPath === ".title") {
        errorList[0].isTitleError = true;
        errorList[0].titleError = "Title is required";
      }
      if (error.dataPath === ".description") {
        errorList[1].isDescError = true;
        errorList[1].descError = "Description is required";
      }
      if (error.dataPath === ".employeeId") {
        errorList[2].isAssigneeError = true;
        errorList[2].assigneeError = "Assignee is required";
      }
      if (error.dataPath === ".statusCode") {
        errorList[3].isStatusError = true;
        errorList[3].statusError = "Status is required";
      }
      if (error.dataPath === ".dueDate") {
        errorList[4].isDueDateError = true;
        errorList[4].dueDateError = "Due Date is required";
      }
    });
  }

  let returnObj = {
    isValid: isValid,
    errorList: errorList
  }

  return returnObj;
}
