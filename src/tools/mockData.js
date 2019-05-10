const devPlans = [
  {
    id: 1,
    title: "Securing React Apps with Auth0",
    description: "react-auth0-authentication-security",
    statusCode: "Completed",
    employeeId: "Yuri Jogoori Jo",
    dueDate: "2019-05-01"
  },
  {
    id: 2,
    title: "React: The Big Picture",
    description: "react-big-picture",
    statusCode: "In Progress",
    employeeId: "Yena Duck Choi",
    dueDate: "2019-05-01"
  },
  {
    id: 3,
    title: "Creating Reusable React Components",
    description: "react-creating-reusable-components",
    statusCode: "Not Started",
    employeeId: "Eunbi Leader Kwon",
    dueDate: "2019-05-01"
  }
];

const employees = [
  {
    id: "Yuri Jogoori Jo",
    lastName: "Jo",
    firstName: "Yuri",
    middleName: "Jogoori",
    fullName: "Yuri Jogoori Jo",
    archived: "No",
    hireDate: "2019-05-01"
  },
  {
    id: "Yena Duck Choi",
    lastName: "Choi",
    firstName: "Yena",
    middleName: "Duck",
    fullName: "Yena Duck Choi",
    archived: "No",
    hireDate: "2019-05-01"
  },
  {
    id: "Eunbi Leader Kwon",
    lastName: "Kwon",
    firstName: "Eunbi",
    middleName: "Leader",
    fullName: "Eunbi Leader Kwon",
    archived: "No",
    hireDate: "2019-05-01"
  }
];

const newDevPlan = {
  id: null,
  title: "",
  employeeId: null,
  description: ""
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newDevPlan,
  devPlans,
  employees
};
