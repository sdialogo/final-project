import * as React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import {
  loadEmployees,
  addEmployee
} from "../../redux/actions/employeeActions";

import {
  Grid,
  TextField,
  Paper,
  CardActions,
  Button,
  MenuItem
} from "@material-ui/core";

import { TEmployee } from "../../common/types";
import { getFullName } from "../../common/functions";

type TState = {
  employee: TEmployee;
  redirectToViewPage: boolean;
  isFirstNameError: boolean;
  isMiddleNameError: boolean;
  isLastNameError: boolean;
  isHireDateError: boolean;
  isArchivedError: boolean;
  firstNameError: string;
  middleNameError: string;
  lastNameError: string;
  hireDateError: string;
  archivedError: string;
};

type TProps = {
  loadEmployees: any;
  addEmployee: any;
};

let schema = {
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

const options = [
  {
    value: "Yes",
    label: "Yes"
  },
  {
    value: "No",
    label: "No"
  }
];

type TStyles = {
  addEmployee: string;
  addForm: string;
  buttonStyle: string;
};

const styles: TStyles = require("./EmployeeStyles.less");

class AddEmployee extends React.Component<TProps, TState> {
  state: TState = {
    employee: {
      id: "",
      firstName: "",
      lastName: "",
      middleName: "",
      fullName: "",
      archived: false,
      hireDate: ""
    },
    redirectToViewPage: false,
    isFirstNameError: false,
    isMiddleNameError: false,
    isLastNameError: false,
    isHireDateError: false,
    isArchivedError: false,
    firstNameError: "",
    middleNameError: "",
    lastNameError: "",
    hireDateError: "",
    archivedError: ""
  };

  handleChange = (name: any) => (event: any) => {
    let employee = { ...this.state.employee, [name]: event.target.value };

    let fullName = getFullName(employee);
    employee.fullName = fullName;
    employee.id = fullName;

    if (name === "firstName") {
      this.setState({ isFirstNameError: false });
    } else if (name === "middleName") {
      this.setState({ isMiddleNameError: false });
    } else if (name === "lastName") {
      this.setState({ isLastNameError: false });
    } else if (name === "hireDate") {
      this.setState({ isHireDateError: false });
    } else if (name === "archived") {
      this.setState({ isArchivedError: false });
    }

    this.setState({ employee: employee });
  };

  validate = (data: TEmployee) => {
    var Ajv = require("ajv");
    var ajv = Ajv({ allErrors: true });
    var valid = ajv.validate(schema, data);
    let isValid;

    if (valid) {
      isValid = true;
    } else {
      isValid = false;
      console.log(ajv.errors);
      ajv.errors.map((error: any) => {
        if (error.dataPath === ".firstName") {
          this.setState({
            isFirstNameError: true,
            firstNameError: "First Name is required"
          });
        }
        if (error.dataPath === ".middleName") {
          this.setState({
            isMiddleNameError: true,
            middleNameError: "Middle Name is required"
          });
        }
        if (error.dataPath === ".lastName") {
          this.setState({
            isLastNameError: true,
            lastNameError: "Last Name is required"
          });
        }
        if (error.dataPath === ".hireDate") {
          this.setState({
            isHireDateError: true,
            hireDateError: "Hire Date is required"
          });
        }
        if (error.dataPath === ".archived") {
          this.setState({
            isArchivedError: true,
            archivedError: "Archived is required"
          });
        }
      });
    }

    return isValid;
  };

  handleSave = (event: any) => {
    event.preventDefault();
    const isValid = this.validate(this.state.employee);

    if (isValid) {
      console.log("Save...");

      this.setState({ redirectToViewPage: true });
      this.props.addEmployee(this.state.employee);
    }
  };

  handleCancel = () => {
    console.log("Cancel...");
    this.setState({ redirectToViewPage: true });
  };

  render() {
    const {
      redirectToViewPage,
      employee,
      isFirstNameError,
      isMiddleNameError,
      isLastNameError,
      isArchivedError,
      isHireDateError,
      firstNameError,
      middleNameError,
      lastNameError,
      hireDateError,
      archivedError
    } = this.state;

    return (
      <div>
        {redirectToViewPage && <Redirect to="/employees" />}
        <Grid container alignItems="center">
          <Grid item>
            <h2 className={styles.addEmployee}>Add Employee</h2>
          </Grid>
        </Grid>
        <Paper>
          <form noValidate autoComplete="off">
            <Grid container className={styles.addForm}>
              <Grid container alignItems="center" spacing={32}>
                <Grid item sm={6}>
                  <TextField
                    id="firstName"
                    label="First Name"
                    value={employee.firstName}
                    onChange={this.handleChange("firstName")}
                    margin="normal"
                    fullWidth
                    error={isFirstNameError}
                    helperText={isFirstNameError ? firstNameError : ""}
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    id="lastName"
                    label="Last Name"
                    value={employee.lastName}
                    onChange={this.handleChange("lastName")}
                    margin="normal"
                    fullWidth
                    error={isLastNameError}
                    helperText={isLastNameError ? lastNameError : ""}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="middleName"
                    label="Middle Name"
                    value={employee.middleName}
                    onChange={this.handleChange("middleName")}
                    margin="normal"
                    fullWidth
                    error={isMiddleNameError}
                    helperText={isMiddleNameError ? middleNameError : ""}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="hireDate"
                    label="Hire Date"
                    type="date"
                    value={employee.hireDate}
                    onChange={this.handleChange("hireDate")}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                      shrink: true
                    }}
                    error={isHireDateError}
                    helperText={isHireDateError ? hireDateError : ""}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="archived"
                    select
                    label="Archived"
                    value={employee.archived}
                    onChange={this.handleChange("archived")}
                    margin="normal"
                    fullWidth
                    error={isArchivedError}
                    helperText={isArchivedError ? archivedError : ""}
                  >
                    {options.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <CardActions>
          <Grid spacing={8} justify="flex-end" container>
            <Grid item>
              <Button className={styles.buttonStyle} onClick={this.handleSave}>
                Save
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={styles.buttonStyle}
                onClick={this.handleCancel}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    employees: state.employees
  };
}

const mapDispatchToProps = {
  loadEmployees,
  addEmployee
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEmployee);
