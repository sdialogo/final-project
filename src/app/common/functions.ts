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

let successfulDevPlanAdd = false;
let successfulEmployeeAdd = false;

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
      type: "number",
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
      type: "boolean"
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

export function findDataById(id: number, arr: TDevPlan[]): TDevPlan {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return arr[i];
    }
  }

  return {
    id: null,
    title: "",
    description: "",
    statusCode: "",
    employeeId: null,
    employeeName: "",
    dueDate: ""
  };
}

export function findEmployeeById(id: number, arr: TEmployee[]): TEmployee {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return arr[i];
    }
  }

  return {
    id: null,
    firstName: "",
    lastName: "",
    middleName: "",
    fullName: "",
    archived: false,
    hireDate: ""
  };
}

export function validateDevPlan(data: TDevPlan, action: string) {
  var Ajv = require("ajv");
  var ajv = Ajv({ allErrors: true });
  var valid = ajv.validate(devPlanSchema, data);
  let isValid;

  if (valid) {
    isValid = true;
    if (action === "add") {
      successfulDevPlanAdd = true;
    }
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
  };

  return returnObj;
}

export function isDevPlanAddSuccessful() {
  let isSuccess = successfulDevPlanAdd;
  successfulDevPlanAdd = false;
  return isSuccess;
}

export function validateEmployee(data: TEmployee, action: string) {
  var Ajv = require("ajv");
  var ajv = Ajv({ allErrors: true });
  var valid = ajv.validate(employeeSchema, data);
  let isValid;

  if (valid) {
    isValid = true;
    if (action === "add") {
      successfulEmployeeAdd = true;
    }
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
  };

  return returnObj;
}

export function isEmployeeAddSuccessful() {
  let isSuccess = successfulEmployeeAdd;
  successfulEmployeeAdd = false;
  return isSuccess;
}

export function formatDate(date: string) {
  let formattedDate = new Date(date);
  let day = "" + formattedDate.getDate();
  let month = "" + (formattedDate.getMonth() + 1);
  let year = formattedDate.getFullYear();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  return [month, day, year].join("/");
}

export function generateDevPlanId(data: TDevPlan[]) {
  let ids: number[] = [];

  if (data.length == 0) {
    return 0;
  } else {
    data.forEach(devPlan => {
      ids.push(devPlan.id);
    });
    return Math.max(...ids);
  }
}

export function generateEmployeeId(data: TEmployee[]) {
  let ids: number[] = [];

  if (data.length == 0) {
    return 0;
  } else {
    data.forEach(employee => {
      ids.push(employee.id);
    });

    return Math.max(...ids);
  }
}

export function sortDevPlanTableContentById(data: TDevPlan[]) {
  let sortedData = data.sort((a: TDevPlan, b: TDevPlan) =>
    a.id < b.id ? -1 : a.id > b.id ? 1 : 0
  );

  return sortedData;
}

export function sortEmployeeTableContentById(data: TEmployee[]) {
  let sortedData = data.sort((a: TEmployee, b: TEmployee) =>
    a.id < b.id ? -1 : a.id > b.id ? 1 : 0
  );

  return sortedData;
}

export function sortDevPlanByTitle(data: TDevPlan[], order: string) {
  let sortedData = data;

  if (order === "desc") {
    sortedData = data.sort((a: TDevPlan, b: TDevPlan) =>
      a.title < b.title ? -1 : a.title > b.title ? 1 : 0
    );
  }

  if (order === "asc") {
    sortedData = data.sort((a: TDevPlan, b: TDevPlan) =>
      a.title > b.title ? -1 : a.title < b.title ? 1 : 0
    );
  }

  return sortedData;
}

export function sortEmployeeByName(data: TEmployee[], order: string) {
  let sortedData = data;

  if (order === "desc") {
    sortedData = data.sort((a: TEmployee, b: TEmployee) =>
      a.lastName < b.lastName ? -1 : a.lastName > b.lastName ? 1 : 0
    );
  }

  if (order === "asc") {
    sortedData = data.sort((a: TEmployee, b: TEmployee) =>
      a.lastName > b.lastName ? -1 : a.lastName < b.lastName ? 1 : 0
    );
  }

  return sortedData;
}
