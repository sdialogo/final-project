import * as React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { loadDevPlans, addDevPlan } from "../../redux/actions/devPlanActions";
import { loadEmployees } from "../../redux/actions/employeeActions";

import StatusDropdown from "../../common/StatusDropdown";
import EmployeeDropdown from "../../common/EmployeeDropdown";
import { TDevPlan } from "../../common/types";

import { Grid, TextField, Paper, CardActions, Button } from "@material-ui/core";

type TState = {
  devPlan: TDevPlan;
  redirectToViewPage: any;
  titleError: string;
  descError: string;
  duedateError: string;
  assigneeError: string;
  statusError: string;
  isTitleError: boolean;
  isDescError: boolean;
  isDueDateError: boolean;
  isAssigneeError: boolean;
  isStatusError: boolean;
  fieldRequiredError: string;
};

type TProps = {
  devPlans: TDevPlan[];
  employees: any;
  loadDevPlans: any;
  loadEmployees: any;
  addDevPlan: any;
};

let schema = {
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

type TStyles = {
  addHeader: string;
  addForm: string;
  buttonStyle: string;
};

const styles: TStyles = require("./DevPlanStyles.less");

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
    titleError: "",
    descError: "",
    duedateError: "",
    assigneeError: "",
    statusError: "",
    isTitleError: false,
    isDescError: false,
    isDueDateError: false,
    isAssigneeError: false,
    isStatusError: false,
    fieldRequiredError: "This field is required"
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

    if (name === "title") {
      devPlan.id = event.target.value;
      this.setState({ isTitleError: false });
    } else if (name === "description") {
      this.setState({ isDescError: false });
    } else if (name === "dueDate") {
      this.setState({ isDueDateError: false });
    } else if (name === "employeeId") {
      this.setState({ isAssigneeError: false });
    } else if (name === "statusCode") {
      this.setState({ isStatusError: false });
    }

    this.setState({ devPlan: devPlan });
  };

  validate = (data: TDevPlan) => {
    var Ajv = require("ajv");
    var ajv = Ajv({ allErrors: true });
    var valid = ajv.validate(schema, data);
    let isValid;

    if (valid) {
      isValid = true;
    } else {
      isValid = false;
      ajv.errors.map((error: any) => {
        if (error.dataPath === ".title") {
          this.setState({
            isTitleError: true,
            titleError: "Title is required"
          });
        }
        if (error.dataPath === ".description") {
          this.setState({
            isDescError: true,
            descError: "Description is required"
          });
        }
        if (error.dataPath === ".employeeId") {
          this.setState({
            isAssigneeError: true,
            assigneeError: "Assignee is required"
          });
        }
        if (error.dataPath === ".statusCode") {
          this.setState({
            isStatusError: true,
            statusError: "Status is required"
          });
        }
        if (error.dataPath === ".dueDate") {
          this.setState({
            isDueDateError: true,
            duedateError: "Due Date is required"
          });
        }
      });
    }

    return isValid;
  };

  handleSave = (event: any) => {
    event.preventDefault();
    const isValid = this.validate(this.state.devPlan);

    if (isValid) {
      console.log("Save...");

      this.setState({ redirectToViewPage: true });
      this.props.addDevPlan(this.state.devPlan);
    }
  };

  handleCancel = () => {
    console.log("Cancel...");
    this.setState({ redirectToViewPage: true });
  };

  render() {
    const {
      redirectToViewPage,
      devPlan,
      fieldRequiredError,
      isTitleError,
      isDescError,
      isAssigneeError,
      isDueDateError,
      isStatusError,
      titleError,
      descError,
      assigneeError,
      duedateError,
      statusError
    } = this.state;

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
                    error={isTitleError}
                    helperText={isTitleError ? titleError : ""}
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
                    error={isDescError}
                    helperText={isDescError ? descError : ""}
                  />
                </Grid>
                <Grid item xs={6}>
                  <EmployeeDropdown
                    employees={this.props.employees}
                    onChange={this.handleChange}
                    value={devPlan.employeeId}
                    error={isAssigneeError}
                    helperText={isAssigneeError ? assigneeError : ""}
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
                    error={isDueDateError}
                    helperText={isDueDateError ? duedateError : ""}
                  />
                </Grid>
                <Grid item xs={6}>
                  <StatusDropdown
                    onChange={this.handleChange}
                    value={devPlan.statusCode}
                    error={isStatusError}
                    helperText={isStatusError ? statusError : ""}
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
