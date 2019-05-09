import { TEmployee, TDevPlan, TDevPlanError, TEmployeeError } from "./types";

let errorList: TDevPlanError = [
  { isTitleError: false, titleError: "" },
  { isDescError: false, descError: "" },
  { isAssigneeError: false, assigneeError: "" },
  { isStatusError: false, statusError: "" },
  { isDueDateError: false, dueDateError: "" }
];

let employeeErrorList: TEmployeeError = [
  { isFirstNameError: false, firstNameError: "" },
  { isMiddleNameError: false, middleNameError: "" },
  { isLastNameError: false, lastNameError: "" },
  { isHireDateError: false, hireDateError: "" },
  { isArchivedError: false, archivedError: "" }
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

let employeeSchema = {
  properties: {
    firstName: {
      type: "string",
      minLength: 1
    },
    middleName: {
      type: "string",
      minLength: 1
    },
    lastName: {
      type: "string",
      minLength: 1
    },
    hireDate: {
      type: "string",
      minLength: 1
    },
    archived: {
      type: "string"
    }
  },
  required: ["firstName", "middleName", "lastName", "hireDate", "archived"]
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

export function validateEmployee(data: TEmployee) {
  console.log("Validating employee...");

  var Ajv = require("ajv");
  var ajv = Ajv({ allErrors: true });
  var valid = ajv.validate(employeeSchema, data);
  let isValid;

  if (valid) {
    isValid = true;
  } else {
    isValid = false;
    ajv.errors.map((error: any) => {
      if (error.dataPath === ".firstName") {
        employeeErrorList[0].isFirstNameError = true;
        employeeErrorList[0].firstNameError = "First Name is required";
      }
      if (error.dataPath === ".middleName") {
        employeeErrorList[1].isMiddleNameError = true;
        employeeErrorList[1].middleNameError = "Middle Name is required";
      }
      if (error.dataPath === ".lastName") {
        employeeErrorList[2].isLastNameError = true;
        employeeErrorList[2].lastNameError = "Last Name is required";
      }
      if (error.dataPath === ".hireDate") {
        employeeErrorList[3].isHireDateError = true;
        employeeErrorList[3].hireDateError = "Hire Date is required";
      }
      if (error.dataPath === ".archived") {
        employeeErrorList[4].isArchivedError = true;
        employeeErrorList[4].archivedError = "Archived is required";
      }
    });
  }

  let returnObj = {
    isValid: isValid,
    errorList: employeeErrorList
  }

  return returnObj;
}