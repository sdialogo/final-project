import * as React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { addDevPlan, deleteDevPlan } from "../../redux/actions/devPlanActions";

import { Status } from "../../enums/StatusEnum";
import StatusDropdown from "../StatusDropdown";

import {
  CardActions,
  Button,
  Grid,
  TextField,
  Divider
} from "@material-ui/core";

type TData = {
  id: number;
  title: string;
  description: string;
  statusCode: string;
  employeeId: number;
  employeeName: string;
  dueDate: string;
};

type TProps = {
  data: TData;
  isEdit: boolean;
  closeDrawer: any;
  tabValue: number;
  addDevPlan: any;
  deleteDevPlan: any;
};

type TState = {
  data: TData;
};

class DevPlanSubViewPage extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  handleSave = (event: any) => {
    console.log("Edit...");
    //update app state; delete then add
    this.props.deleteDevPlan(this.state.data.id);
    this.props.addDevPlan(this.state.data);

    this.props.closeDrawer(event);
    // switch (action) {
    //   case "proceed":
    //     this.props.deleteDevPlan(this.state.data.id);
    //     this.props.addDevPlan(this.state.data);
    //   default:
    //     this.props.closeDrawer;
    //     break;
  };

  handleChange = (name: string) => (event: any) => {
    let newData: TData = { ...this.state.data };
    let input = event.target.value;

    if (name === "title") {
      newData.title = input;
    } else if (name === "description") {
      newData.description = input;
    } else if (name === "dueDate") {
      newData.dueDate = input;
    } else if (name === "assignee") {
      newData.employeeId = Number(input);
    } else if (name === "status") {
      newData.statusCode = input;
    }

    this.setState({ data: newData });
  };
  render() {
    const { isEdit, closeDrawer, tabValue } = this.props;
    const { data } = this.state;
    const date = new Date(data.dueDate);
    console.log("Date: ", date);
    return (
      <div>
        <form noValidate autoComplete="off">
          <Grid
            container
            spacing={16}
            style={{
              paddingLeft: "10px",
              paddingTop: "10px",
              paddingBottom: "10px"
            }}
          >
            <Grid item xs={6}>
              <TextField
                style={{ width: "90%" }}
                id="title"
                label="Title"
                value={data.title}
                onChange={this.handleChange("title")}
                margin="normal"
                variant="outlined"
                disabled={!isEdit}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: "90%" }}
                id="description"
                label="Description"
                value={data.description}
                onChange={this.handleChange("description")}
                margin="normal"
                variant="outlined"
                disabled={!isEdit}
                multiline
                // rows={4}
              />
            </Grid>
            <Grid item xs={6} hidden={tabValue === 1 ? false : true}>
              <TextField
                style={{ width: "90%" }}
                id="assignee"
                label="Assignee"
                value={data.employeeId}
                onChange={this.handleChange("assignee")}
                margin="normal"
                variant="outlined"
                disabled={!isEdit}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: "90%" }}
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
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: "90%" }}
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
              />
            </Grid>
            <Grid item xs={6} hidden={tabValue === 0 ? false : true}>
              {data.statusCode === Status.NotStarted ? (
                <Button disabled style={{ background: "red", color: "white" }}>
                  {data.statusCode}
                </Button>
              ) : data.statusCode === Status.Completed ? (
                <Button
                  disabled
                  style={{
                    background: "green",
                    color: "white"
                  }}
                >
                  {data.statusCode}
                </Button>
              ) : (
                <Button
                  disabled
                  style={{
                    background: "orange",
                    color: "white"
                  }}
                >
                  {data.statusCode}
                </Button>
              )}
            </Grid>
            <Grid item xs={6} hidden={tabValue === 1 ? false : true}>
              <StatusDropdown
                onChange={this.handleChange}
                value={data.statusCode}
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
                  style={{
                    background: "rgba(73,155,234,1)",
                    color: "white"
                  }}
                  onClick={this.handleSave}
                >
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    background: "rgba(73,155,234,1)",
                    color: "white"
                  }}
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
                  style={{
                    background: "rgba(73,155,234,1)",
                    color: "white"
                  }}
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
