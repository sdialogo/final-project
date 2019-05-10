import * as React from "react";
import { connect } from "react-redux";
import { addDevPlan, deleteDevPlan } from "../../redux/actions/devPlanActions";

import { Status } from "../../common/statusEnum";
import { TDevPlan, TEmployee } from "../../common/types";
import StatusDropdown from "../shared/statusDropdown";
import EmployeeDropdown from "../shared/employeeDropdown";

import {
  CardActions,
  Button,
  Grid,
  TextField,
  Divider
} from "@material-ui/core";

type TProps = {
  data: TDevPlan;
  isEdit: boolean;
  closeDrawer: Function;
  tabValue: number;
  addDevPlan: Function;
  deleteDevPlan: Function;
  employees: TEmployee[];
};

type TState = {
  data: TDevPlan;
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
      titleError: "",
      descError: "",
      duedateError: "",
      assigneeError: "",
      statusError: "",
      isTitleError: false,
      isDescError: false,
      isDueDateError: false,
      isAssigneeError: false,
      isStatusError: false
    };
  }

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
    const isValid = this.validate(this.state.data);

    if (isValid) {
      console.log("Edit...");
      //update app state; delete then add
      this.props.deleteDevPlan(this.state.data.id);
      this.props.addDevPlan(this.state.data);

      this.props.closeDrawer(event);
    }
  };

  handleChange = (name: string) => (event: any) => {
    let devPlan = { ...this.state.data, [name]: event.target.value };

    if (name === "title") {
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

    this.setState({ data: devPlan });
  };
  render() {
    const { isEdit, closeDrawer, tabValue } = this.props;
    const {
      data,
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
                error={isTitleError}
                helperText={isTitleError ? titleError : ""}
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
                error={isDescError}
                helperText={isDescError ? descError : ""}
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
                error={isDueDateError}
                helperText={isDueDateError ? duedateError : ""}
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
                error={isDueDateError}
                helperText={isDueDateError ? duedateError : ""}
              />
            </Grid>
            <Grid item xs={6} hidden={tabValue === 1 ? false : true}>
              <EmployeeDropdown
                employees={this.props.employees}
                onChange={this.handleChange}
                value={data.employeeId}
                error={isAssigneeError}
                helperText={isAssigneeError ? assigneeError : ""}
              />
            </Grid>
            <Grid item xs={6} hidden={tabValue === 0 ? false : true}>
              {data.statusCode === Status.NotStarted ? (
                <Button disabled className={styles.redButton}>
                  {data.statusCode}
                </Button>
              ) : data.statusCode === Status.Completed ? (
                <Button disabled className={styles.greenButton}>
                  {data.statusCode}
                </Button>
              ) : (
                <Button disabled className={styles.yellowButton}>
                  {data.statusCode}
                </Button>
              )}
            </Grid>
            <Grid item xs={6} hidden={tabValue === 1 ? false : true}>
              <StatusDropdown
                onChange={this.handleChange}
                value={data.statusCode}
                error={isStatusError}
                helperText={isStatusError ? statusError : ""}
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
                  onClick={event => closeDrawer(event)}
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
                  onClick={event => closeDrawer(event)}
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

function mapStateToProps(state: any) {
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
