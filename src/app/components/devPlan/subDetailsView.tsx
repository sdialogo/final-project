import * as React from "react";
import { connect } from "react-redux";
import { addDevPlan, deleteDevPlan } from "../../redux/actions/devPlanActions";

import {
  TDevPlan,
  TEmployee,
  TDevPlanError,
  TAppState
} from "../../common/types";
import StatusDropdown from "../shared/statusDropdown";
import EmployeeDropdown from "../shared/employeeDropdown";
import { validateDevPlan } from "../../common/functions";

import {
  CardActions,
  Button,
  Grid,
  TextField,
  Divider
} from "@material-ui/core";

type TState = {
  data: TDevPlan;
  errors: TDevPlanError;
};

type TProps = {
  data: TDevPlan;
  isEdit: boolean;
  closeDrawer: Function;
  tabValue: number;
  addDevPlan: Function;
  deleteDevPlan: Function;
  employees: TEmployee[];
};

type TStyles = {
  gridContainer: string;
  buttonStyle: string;
  redButton: string;
  greenButton: string;
  yellowButton: string;
};

const styles: TStyles = require("../../styles/devPlanStyles.less");

class DevPlanSubViewPage extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      data: this.props.data,
      errors: [
        { isTitleError: false, titleError: "" },
        { isDescError: false, descError: "" },
        { isAssigneeError: false, assigneeError: "" },
        { isStatusError: false, statusError: "" },
        { isDueDateError: false, dueDateError: "" }
      ]
    };
  }

  handleSave = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    let returnObj = validateDevPlan(this.state.data);

    if (returnObj.isValid) {
      console.log("Edit...");

      this.props.deleteDevPlan(this.state.data.id);
      this.props.addDevPlan(this.state.data);

      this.props.closeDrawer(event);
    } else {
      this.setState({ errors: returnObj.errorList });
    }
  };

  handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let devPlan = { ...this.state.data, [name]: event.target.value };
    let errorsCopy = this.state.errors;

    if (name === "title") {
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

    this.setState({ data: devPlan, errors: errorsCopy });
  };
  render() {
    const { isEdit, closeDrawer, tabValue } = this.props;
    const { data, errors } = this.state;
    return (
      <div>
        <form noValidate autoComplete="off">
          <Grid container spacing={16} className={styles.gridContainer}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="title"
                label="Title"
                value={data.title}
                onChange={this.handleChange("title")}
                margin="normal"
                variant="outlined"
                disabled={!isEdit}
                error={errors[0].isTitleError}
                helperText={errors[0].isTitleError ? errors[0].titleError : ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="description"
                label="Description"
                value={data.description}
                onChange={this.handleChange("description")}
                margin="normal"
                variant="outlined"
                disabled={!isEdit}
                multiline
                error={errors[1].isDescError}
                helperText={errors[1].isDescError ? errors[1].descError : ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="dueDate"
                label="Due Date"
                type="date"
                value={data.dueDate}
                onChange={this.handleChange("dueDate")}
                margin="normal"
                variant="outlined"
                disabled={!isEdit}
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
              <TextField
                fullWidth
                id="dateCompleted"
                label="Date Completed"
                type="date"
                value={data.dueDate}
                onChange={this.handleChange("dateCompleted")}
                margin="normal"
                variant="outlined"
                disabled={!isEdit}
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
              <EmployeeDropdown
                employees={this.props.employees}
                onChange={this.handleChange}
                value={data.employeeId}
                isEdit={!isEdit}
                error={errors[2].isAssigneeError}
                helperText={
                  errors[2].isAssigneeError ? errors[2].assigneeError : ""
                }
              />
            </Grid>
            <Grid item xs={6}>
              <StatusDropdown
                onChange={this.handleChange}
                value={data.statusCode}
                isEdit={!isEdit}
                error={errors[3].isStatusError}
                helperText={
                  errors[3].isStatusError ? errors[3].statusError : ""
                }
              />
            </Grid>
          </Grid>
        </form>
        <Divider />
        <CardActions>
          {tabValue === 1 ? (
            <Grid spacing={8} justify="flex-end" container>
              <Grid item>
                <Button
                  className={styles.buttonStyle}
                  onClick={this.handleSave}
                >
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={styles.buttonStyle}
                  onClick={event => closeDrawer(event, "close")}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid spacing={8} justify="flex-end" container>
              <Grid item>
                <Button
                  className={styles.buttonStyle}
                  onClick={event => closeDrawer(event, "close")}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          )}
        </CardActions>
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
  addDevPlan,
  deleteDevPlan
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DevPlanSubViewPage);
