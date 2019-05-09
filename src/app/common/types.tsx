export type TDevPlan = {
  id: string;
  title: string;
  description: string;
  statusCode: string;
  employeeId: string;
  employeeName: string;
  dueDate: string;
};

export type TEmployee = {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  fullName: string;
  archived: boolean;
  hireDate: string;
};

export type TDevPlanError = [
  { isTitleError: boolean; titleError: string },
  { isDescError: boolean; descError: string },
  { isAssigneeError: boolean; assigneeError: string },
  { isStatusError: boolean; statusError: string },
  { isDueDateError: boolean; dueDateError: string }
];