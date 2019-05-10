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

import { TEmployee, TEmployeeError } from "../../common/types";
import { getFullName, validateEmployee } from "../../common/functions";

type TState = {
  employee: TEmployee;
  redirectToViewPage: boolean;
  errors: TEmployeeError;
};

type TProps = {
  loadEmployees: any;
  addEmployee: any;
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

const styles: TStyles = require("../../styles/employeeStyles.less");

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
    errors: [
      { isFirstNameError: false, firstNameError: "" },
      { isMiddleNameError: false, middleNameError: "" },
      { isLastNameError: false, lastNameError: "" },
      { isHireDateError: false, hireDateError: "" },
      { isArchivedError: false, archivedError: "" }
    ]
  };

  handleChange = (name: any) => (event: any) => {
    let employee = { ...this.state.employee, [name]: event.target.value };
    let errorsCopy = this.state.errors;

    let fullName = getFullName(employee);
    employee.fullName = fullName;
    employee.id = fullName;

    if (name === "firstName") {
      errorsCopy[0].isFirstNameError = false;
      errorsCopy[0].firstNameError = "";
    } else if (name === "middleName") {
      errorsCopy[1].isMiddleNameError = false;
      errorsCopy[1].middleNameError = "";
    } else if (name === "lastName") {
      errorsCopy[2].isLastNameError = false;
      errorsCopy[2].lastNameError = "";
    } else if (name === "hireDate") {
      errorsCopy[3].isHireDateError = false;
      errorsCopy[3].hireDateError = "";
    } else if (name === "archived") {
      errorsCopy[4].isArchivedError = false;
      errorsCopy[4].archivedError = "";
    }

    this.setState({ employee: employee, errors: errorsCopy });
  };

  handleSave = (event: any) => {
    event.preventDefault();
    let returnObj = validateEmployee(this.state.employee);

    if (returnObj.isValid) {
      console.log("Save...");

      this.setState({ redirectToViewPage: true });
      this.props.addEmployee(this.state.employee);
    } else {
      this.setState({ errors: returnObj.errorList });
    }
  };

  handleCancel = () => {
    console.log("Cancel...");
    this.setState({ redirectToViewPage: true });
  };

  render() {
    const { redirectToViewPage, employee, errors } = this.state;

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
                    error={errors[0].isFirstNameError}
                    helperText={
                      errors[0].isFirstNameError ? errors[0].firstNameError : ""
                    }
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
                    error={errors[2].isLastNameError}
                    helperText={
                      errors[2].isLastNameError ? errors[2].lastNameError : ""
                    }
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
                    error={errors[1].isMiddleNameError}
                    helperText={
                      errors[1].isMiddleNameError
                        ? errors[1].isMiddleNameError
                        : ""
                    }
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
                    error={errors[3].isHireDateError}
                    helperText={
                      errors[3].isHireDateError ? errors[3].hireDateError : ""
                    }
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
                    error={errors[4].isArchivedError}
                    helperText={
                      errors[4].isArchivedError ? errors[4].archivedError : ""
                    }
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