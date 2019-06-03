import * as React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { loadDevPlans, addDevPlan } from "../../redux/actions/devPlanActions";
import { loadEmployees } from "../../redux/actions/employeeActions";

import StatusDropdown from "../shared/statusDropdown";
import EmployeeDropdown from "../shared/employeeDropdown";
import {
  TDevPlan,
  TDevPlanError,
  TEmployee,
  TAppState
} from "../../common/types";
import { validateDevPlan, generateDevPlanId } from "../../common/functions";

import {
  Grid,
  TextField,
  Paper,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";

type TState = {
  devPlan: TDevPlan;
  redirectToViewPage: boolean;
  errors: TDevPlanError;
  discardChanges: boolean;
  hasChanges: boolean;
  open: boolean;
};

type TProps = {
  devPlans: TDevPlan[];
  employees: TEmployee[];
  loadDevPlans: Function;
  loadEmployees: Function;
  addDevPlan: Function;
};

type TStyles = {
  addHeader: string;
  addForm: string;
  buttonStyle: string;
  secondaryButtonStyle: string;
  closeButtonStyle: string;
};

const styles: TStyles = require("../../styles/devPlanStyles.less");

class AddDevPlan extends React.Component<TProps, TState> {
  state: TState = {
    devPlan: {
      id: 0,
      title: "",
      description: "",
      statusCode: "",
      employeeId: 0,
      employeeName: "",
      dueDate: ""
    },
    redirectToViewPage: false,
    errors: [
      { isTitleError: false, titleError: "" },
      { isDescError: false, descError: "" },
      { isAssigneeError: false, assigneeError: "" },
      { isStatusError: false, statusError: "" },
      { isDueDateError: false, dueDateError: "" }
    ],
    discardChanges: false,
    hasChanges: false,
    open: false
  };

  componentDidMount() {
    const { devPlans, employees, loadDevPlans, loadEmployees } = this.props;

    if (devPlans.length === 0) {
      loadDevPlans().catch((error: string) => {
        alert("Loading dev plans failed: " + error);
      });
    }

    if (employees.length === 0) {
      loadEmployees().catch((error: string) => {
        alert("Loading employees failed: " + error);
      });
    }
  }

  handleChange = (name: string, event: React.ChangeEvent<HTMLInputElement>) => {
    let devPlan = { ...this.state.devPlan, [name]: event.target.value };
    let errorsCopy = this.state.errors;
    let currId = generateDevPlanId(this.props.devPlans);

    if (name === "title") {
      errorsCopy[0].isTitleError = false;
      errorsCopy[0].titleError = "";
    } else if (name === "description") {
      errorsCopy[1].isDescError = false;
      errorsCopy[1].descError = "";
    } else if (name === "employeeId") {
      devPlan.employeeId = Number(event.target.value);
      errorsCopy[2].isAssigneeError = false;
      errorsCopy[2].assigneeError = "";
    } else if (name === "statusCode") {
      errorsCopy[3].isStatusError = false;
      errorsCopy[3].statusError = "";
    } else if (name === "dueDate") {
      errorsCopy[4].isDueDateError = false;
      errorsCopy[4].dueDateError = "";
    }

    devPlan.id = currId + 1;

    this.setState({ devPlan: devPlan, errors: errorsCopy, hasChanges: true });
  };

  handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let returnObj = validateDevPlan(this.state.devPlan, "add");

    if (returnObj.isValid) {
      this.setState({ redirectToViewPage: true });
      this.props.addDevPlan(this.state.devPlan);
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
      devPlan,
      errors,
      discardChanges,
      hasChanges,
      open
    } = this.state;

    return (
      <div>
        {redirectToViewPage && <Redirect to="/devPlans" />}
        <Grid container alignItems="center">
          <Grid item>
            <h2 className={styles.addHeader}>Add Development Plan</h2>
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
                    variant="outlined"
                    id="title"
                    label="Title"
                    value={devPlan.title}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      this.handleChange("title", event)
                    }
                    margin="normal"
                    fullWidth
                    error={errors[0].isTitleError}
                    helperText={
                      errors[0].isTitleError ? errors[0].titleError : ""
                    }
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    variant="outlined"
                    id="description"
                    label="Description"
                    value={devPlan.description}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      this.handleChange("description", event)
                    }
                    margin="normal"
                    fullWidth
                    multiline
                    error={errors[1].isDescError}
                    helperText={
                      errors[1].isDescError ? errors[1].descError : ""
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <EmployeeDropdown
                    employees={this.props.employees}
                    onChange={this.handleChange.bind(this)}
                    value={Number(devPlan.employeeId)}
                    isEdit={false}
                    error={errors[2].isAssigneeError}
                    helperText={
                      errors[2].isAssigneeError ? errors[2].assigneeError : ""
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    id="dueDate"
                    label="Due Date"
                    type="date"
                    value={devPlan.dueDate}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      this.handleChange("dueDate", event)
                    }
                    margin="normal"
                    fullWidth
                    error={errors[4].isDueDateError}
                    helperText={
                      errors[4].isDueDateError ? errors[4].dueDateError : ""
                    }
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <StatusDropdown
                    onChange={this.handleChange.bind(this)}
                    value={devPlan.statusCode}
                    isEdit={false}
                    error={errors[3].isStatusError}
                    helperText={
                      errors[3].isStatusError ? errors[3].statusError : ""
                    }
                  />
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
    devPlans: state.devPlans,
    employees: state.employees
  };
}

const mapDispatchToProps = {
  loadDevPlans,
  loadEmployees,
  addDevPlan
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDevPlan);
