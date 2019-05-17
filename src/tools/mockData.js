const devPlans = [
  {
    id: 1,
    title: "Securing React Apps with Auth0",
    description: "react-auth0-authentication-security",
    statusCode: "Completed",
    employeeId: "Yuri Yul Jo",
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
    title: "React: The Big Picture Part Two",
    description: "react-big-picture",
    statusCode: "In Progress",
    employeeId: "Yena Duck Choi",
    dueDate: "2019-05-21"
  },
  {
    id: 4,
    title: "Creating Reusable React Components",
    description: "react-creating-reusable-components",
    statusCode: "Not Started",
    employeeId: "Eunbi Leader Kwon",
    dueDate: "2019-05-01"
  },
  {
    id: 5,
    title: "Creating Reusable React Components Part Two",
    description: "react-creating-reusable-components",
    statusCode: "Not Started",
    employeeId: "Eunbi Leader Kwon",
    dueDate: "2019-05-12"
  },
  {
    id: 6,
    title: "Creating Reusable React Components Part Three",
    description: "react-creating-reusable-components",
    statusCode: "Not Started",
    employeeId: "Eunbi Leader Kwon",
    dueDate: "2019-05-24"
  }
];

const employees = [
  {
    id: "Yuri Yul Jo",
    lastName: "Jo",
    firstName: "Yuri",
    middleName: "Yul",
    fullName: "Yuri Yul Jo",
    archived: false,
    hireDate: "2019-05-01"
  },
  {
    id: "Yena Duck Choi",
    lastName: "Choi",
    firstName: "Yena",
    middleName: "Duck",
    fullName: "Yena Duck Choi",
    archived: false,
    hireDate: "2019-05-01"
  },
  {
    id: "Eunbi Leader Kwon",
    lastName: "Kwon",
    firstName: "Eunbi",
    middleName: "Leader",
    fullName: "Eunbi Leader Kwon",
    archived: false,
    hireDate: "2019-05-01"
  },
  {
    id: "Hitomi Ppang Honda",
    lastName: "Honda",
    firstName: "Hitomi",
    middleName: "Ppang",
    fullName: "Hitomi Ppang Honda",
    archived: false,
    hireDate: "2019-05-012"
  },
  {
    id: "Chaewon Ssam Kim",
    lastName: "Kim",
    firstName: "Chaewon",
    middleName: "Ssam",
    fullName: "Chaewon Ssam Kim",
    archived: false,
    hireDate: "2019-05-012"
  },
  {
    id: "Yujin Puppy Ahn",
    lastName: "Ahn",
    firstName: "Yujin",
    middleName: "Puppy",
    fullName: "Yujin Puppy Ahn",
    archived: false,
    hireDate: "2019-05-012"
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
