import * as React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { loadDevPlans, addDevPlan } from "../../redux/actions/devPlanActions";
import { loadEmployees } from "../../redux/actions/employeeActions";

import StatusDropdown from "../shared/statusDropdown";
import EmployeeDropdown from "../shared/employeeDropdown";
import { TDevPlan, TDevPlanError, TEmployee } from "../../common/types";
import { validateDevPlan } from "../../common/functions";

import { Grid, TextField, Paper, CardActions, Button } from "@material-ui/core";

type TState = {
  devPlan: TDevPlan;
  redirectToViewPage: boolean;
  errors: TDevPlanError;
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
};

const styles: TStyles = require("../../styles/devPlanStyles.less");

class AddDevPlan extends React.Component<TProps, TState> {
  state: TState = {
    devPlan: {
      id: "",
      title: "",
      description: "",
      statusCode: "",
      employeeId: "",
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
    ]
  };

  componentDidMount() {
    const { devPlans, employees, loadDevPlans, loadEmployees } = this.props;

    if (devPlans.length === 0) {
      loadDevPlans().catch((error: any) => {
        alert("Loading dev plans failed: " + error);
      });
    }

    if (employees.length === 0) {
      loadEmployees().catch((error: any) => {
        alert("Loading employees failed: " + error);
      });
    }
  }

  handleChange = (name: any) => (event: any) => {
    let devPlan = { ...this.state.devPlan, [name]: event.target.value };
    let errorsCopy = this.state.errors;

    if (name === "title") {
      devPlan.id = event.target.value;
      errorsCopy[0].isTitleError = false;
      errorsCopy[0].titleError = "";
    } else if (name === "description") {
      errorsCopy[1].isDescError = false;
      errorsCopy[1].descError = "";
    } else if (name === "employeeId") {
      errorsCopy[2].isAssigneeError = false;
      errorsCopy[2].assigneeError = "";
    } else if (name === "statusCode") {
      errorsCopy[3].isStatusError = false;
      errorsCopy[3].statusError = "";
    } else if (name === "dueDate") {
      errorsCopy[4].isDueDateError = false;
      errorsCopy[4].dueDateError = "";
    }

    this.setState({ devPlan: devPlan, errors: errorsCopy });
  };

  handleSave = (event: any) => {
    event.preventDefault();
    let returnObj = validateDevPlan(this.state.devPlan);

    if (returnObj.isValid) {
      console.log("Save...");

      this.setState({ redirectToViewPage: true });
      this.props.addDevPlan(this.state.devPlan);
    } else {
      this.setState({ errors: returnObj.errorList });
    }
  };

  handleCancel = () => {
    console.log("Cancel...");
    this.setState({ redirectToViewPage: true });
  };

  render() {
    const { redirectToViewPage, devPlan, errors } = this.state;

    return (
      <div>
        {redirectToViewPage && <Redirect to="/devPlans" />}
        <Grid container alignItems="center">
          <Grid item>
            <h2 className={styles.addHeader}>Add Development Plan</h2>
          </Grid>
        </Grid>
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
                    onChange={this.handleChange("title")}
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
                    onChange={this.handleChange("description")}
                    margin="normal"
                    fullWidth
                    error={errors[1].isDescError}
                    helperText={
                      errors[1].isDescError ? errors[1].descError : ""
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <EmployeeDropdown
                    employees={this.props.employees}
                    onChange={this.handleChange}
                    value={devPlan.employeeId}
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
                    onChange={this.handleChange("dueDate")}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                      shrink: true
                    }}
                    error={errors[4].isDueDateError}
                    helperText={
                      errors[4].isDueDateError ? errors[4].dueDateError : ""
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <StatusDropdown
                    onChange={this.handleChange}
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
                <Button className={styles.buttonStyle} type="submit">
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
        </form>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
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
