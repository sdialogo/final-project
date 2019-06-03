import * as React from "react";
import { connect } from "react-redux";
import {
  addDevPlan,
  deleteDevPlan,
  updateDevPlan
} from "../../redux/actions/devPlanActions";

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
  Divider,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";

type TState = {
  data: TDevPlan;
  errors: TDevPlanError;
  discardChanges: boolean;
  hasChanges: boolean;
  open: boolean;
};

type TProps = {
  data: TDevPlan;
  isEdit: boolean;
  closeDrawer(event: React.MouseEvent, button?: string): void;
  tabValue: number;
  addDevPlan: Function;
  deleteDevPlan: Function;
  updateDevPlan: Function;
  employees: TEmployee[];
};

type TStyles = {
  gridContainer: string;
  buttonStyle: string;
  subGreenButton: string;
  subRedButton: string;
  subYellowButton: string;
  secondaryButtonStyle: string;
  closeButtonStyle: string;
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
      ],
      discardChanges: false,
      hasChanges: false,
      open: false
    };
  }

  handleSave = (event: React.MouseEvent) => {
    event.preventDefault();
    let returnObj = validateDevPlan(this.state.data, "edit");

    if (returnObj.isValid) {
      this.props.updateDevPlan(this.state.data);
      this.props.closeDrawer(event);
    } else {
      this.setState({ errors: returnObj.errorList });
    }
  };

  handleChange = (name: string, event: React.ChangeEvent<HTMLInputElement>) => {
    let devPlan = { ...this.state.data, [name]: event.target.value };
    let errorsCopy = this.state.errors;

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

    this.setState({ data: devPlan, errors: errorsCopy, hasChanges: true });
  };

  handleCancel = () => {
    this.setState({ discardChanges: true, open: true });
  };

  handleDiscardChanges = (event: React.MouseEvent) => {
    this.props.closeDrawer(event, "close");
  };

  handleCloseDialog = () => {
    this.setState({ open: false });
  };

  render() {
    const { isEdit, closeDrawer, tabValue } = this.props;
    const { data, errors, discardChanges, hasChanges, open } = this.state;
    return (
      <div>
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
        <form noValidate autoComplete="off">
          <Grid container spacing={16} className={styles.gridContainer}>
            <Grid item xs={6} hidden={!isEdit}>
              <TextField
                fullWidth
                id="title"
                label="Title"
                value={data.title}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  this.handleChange("title", event)
                }
                margin="normal"
                variant="outlined"
                disabled={!isEdit}
                error={errors[0].isTitleError}
                helperText={errors[0].isTitleError ? errors[0].titleError : ""}
              />
            </Grid>
            <Grid item xs={6} hidden={isEdit}>
              <Typography variant="caption">Title</Typography>
              <Typography variant="subheading">{data.title}</Typography>
            </Grid>
            <Grid item xs={6} hidden={!isEdit}>
              <TextField
                fullWidth
                id="description"
                label="Description"
                value={data.description}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  this.handleChange("description", event)
                }
                margin="normal"
                variant="outlined"
                disabled={!isEdit}
                multiline
                error={errors[1].isDescError}
                helperText={errors[1].isDescError ? errors[1].descError : ""}
              />
            </Grid>
            <Grid item xs={6} hidden={isEdit}>
              <Typography variant="caption">Description</Typography>
              <Typography variant="subheading">{data.description}</Typography>
            </Grid>
            <Grid item xs={6} hidden={!isEdit}>
              <TextField
                fullWidth
                id="dueDate"
                label="Due Date"
                type="date"
                value={data.dueDate}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  this.handleChange("dueDate", event)
                }
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
            <Grid item xs={6} hidden={isEdit}>
              <Typography variant="caption">Due Date</Typography>
              <Typography variant="subheading">{data.dueDate}</Typography>
            </Grid>
            <Grid item xs={6} hidden={!isEdit}>
              <TextField
                fullWidth
                id="dateCompleted"
                label="Date Completed"
                type="date"
                value={data.dueDate}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  this.handleChange("dateCompleted", event)
                }
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
            <Grid item xs={6} hidden={isEdit}>
              <Typography variant="caption">Date Completed</Typography>
              <Typography variant="subheading">{data.dueDate}</Typography>
            </Grid>
            <Grid item xs={6} hidden={!isEdit}>
              <EmployeeDropdown
                employees={this.props.employees}
                onChange={this.handleChange.bind(this)}
                value={Number(data.employeeId)}
                isEdit={!isEdit}
                error={errors[2].isAssigneeError}
                helperText={
                  errors[2].isAssigneeError ? errors[2].assigneeError : ""
                }
              />
            </Grid>
            <Grid item xs={6} hidden={isEdit}>
              <Typography variant="caption">Assignee</Typography>
              <Typography variant="subheading">{data.employeeName}</Typography>
            </Grid>
            <Grid item xs={6} hidden={!isEdit}>
              <StatusDropdown
                onChange={this.handleChange.bind(this)}
                value={data.statusCode}
                isEdit={!isEdit}
                error={errors[3].isStatusError}
                helperText={
                  errors[3].isStatusError ? errors[3].statusError : ""
                }
              />
            </Grid>
            <Grid item xs={6} hidden={isEdit}>
              <Typography variant="caption" style={{ paddingBottom: "5px" }}>
                Status
              </Typography>
              <div
                className={
                  data.statusCode == "Completed"
                    ? styles.subGreenButton
                    : data.statusCode == "Not Started"
                    ? styles.subRedButton
                    : styles.subYellowButton
                }
              >
                {data.statusCode}
              </div>
            </Grid>
          </Grid>
        </form>
        <Divider />
        <CardActions>
          {tabValue === 1 ? (
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
                <Button
                  className={styles.buttonStyle}
                  onClick={this.handleSave}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid spacing={8} justify="flex-end" container>
              <Grid item>
                <Button
                  className={styles.closeButtonStyle}
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
  deleteDevPlan,
  updateDevPlan
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DevPlanSubViewPage);
