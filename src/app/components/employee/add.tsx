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
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";

import { TEmployee, TEmployeeError, TAppState } from "../../common/types";
import {
  getFullName,
  validateEmployee,
  generateEmployeeId
} from "../../common/functions";

type TState = {
  employee: TEmployee;
  redirectToViewPage: boolean;
  errors: TEmployeeError;
  discardChanges: boolean;
  hasChanges: boolean;
  open: boolean;
};

type TProps = {
  employees: TEmployee[];
  loadEmployees: Function;
  addEmployee: Function;
};

type TStyles = {
  addEmployee: string;
  addForm: string;
  buttonStyle: string;
  radioButton: string;
  secondaryButtonStyle: string;
  closeButtonStyle: string;
};

const styles: TStyles = require("../../styles/employeeStyles.less");

class AddEmployee extends React.Component<TProps, TState> {
  state: TState = {
    employee: {
      id: null,
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
    ],
    discardChanges: false,
    hasChanges: false,
    open: false
  };

  handleChange = (name: string, event: React.ChangeEvent<HTMLInputElement>) => {
    let employee = { ...this.state.employee, [name]: event.target.value };
    let errorsCopy = this.state.errors;

    let currId = generateEmployeeId(this.props.employees);
    employee.id = currId + 1;

    let fullName = getFullName(employee);
    employee.fullName = fullName;

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

    this.setState({ employee: employee, errors: errorsCopy, hasChanges: true });
  };

  handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let returnObj = validateEmployee(this.state.employee, "add");

    if (returnObj.isValid) {
      this.setState({ redirectToViewPage: true });
      this.props.addEmployee(this.state.employee);
    } else {
      this.setState({ errors: returnObj.errorList });
    }
  };

  handleCancel = () => {
    this.setState({ discardChanges: true, open: true });
  };

  handleCloseDialog = () => {
    this.setState({ open: false });
  };

  handleDiscardChanges = (event: React.MouseEvent) => {
    this.setState({ redirectToViewPage: true });
  };

  render() {
    const {
      redirectToViewPage,
      employee,
      errors,
      discardChanges,
      hasChanges,
      open
    } = this.state;

    return (
      <div>
        {redirectToViewPage && <Redirect to="/employees" />}
        <Grid container alignItems="center">
          <Grid item>
            <h2 className={styles.addEmployee}>Add Employee</h2>
          </Grid>
        </Grid>
        {discardChanges && (
          <div>
            <Dialog
              open={open}
              onClose={this.handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Discard Changes"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Leaving this page will discard the changes made. Are you sure
                  you want to leave?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  className={styles.closeButtonStyle}
                  onClick={this.handleCloseDialog}
                >
                  Stay
                </Button>
                <Button
                  className={styles.secondaryButtonStyle}
                  onClick={this.handleDiscardChanges}
                  autoFocus
                >
                  Leave
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
        <form autoComplete="off" onSubmit={this.handleSave}>
          <Paper>
            <Grid container className={styles.addForm}>
              <Grid container alignItems="center" spacing={32}>
                <Grid item sm={6}>
                  <TextField
                    id="firstName"
                    label="First Name"
                    value={employee.firstName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      this.handleChange("firstName", event)
                    }
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      this.handleChange("lastName", event)
                    }
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      this.handleChange("middleName", event)
                    }
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      this.handleChange("hireDate", event)
                    }
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
                  <FormLabel>Archived</FormLabel>
                  <RadioGroup
                    aria-label="Archived"
                    name="archived"
                    value={String(employee.archived)}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      this.handleChange("archived", event)
                    }
                    className={styles.radioButton}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <CardActions>
            <Grid spacing={8} justify="flex-end" container>
              <Grid item>
                <Button
                  className={styles.closeButtonStyle}
                  onClick={
                    hasChanges ? this.handleCancel : this.handleDiscardChanges
                  }
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button className={styles.buttonStyle} type="submit">
                  Save
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state: TAppState) {
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
