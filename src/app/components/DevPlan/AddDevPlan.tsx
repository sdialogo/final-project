import * as React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { loadDevPlans, addDevPlan } from "../../redux/actions/devPlanActions";
import { loadEmployees } from "../../redux/actions/employeeActions";

import { Status } from "../../enums/StatusEnum";
import StatusDropdown from "../StatusDropdown";

import { Grid, TextField, Paper, CardActions, Button } from "@material-ui/core";

type TDevPlan = {
  id: string;
  title: string;
  description: string;
  statusCode: string;
  employeeId: number;
  employeeName: string;
  dueDate: string;
};

type TState = {
  devPlan: TDevPlan;
  redirectToViewPage: any;
};

type TProps = {
  devPlans: TDevPlan[];
  employees: any;
  loadDevPlans: any;
  loadEmployees: any;
  addDevPlan: any;
};

class AddDevPlan extends React.Component<TProps, TState> {
  state: TState = {
    devPlan: {
      id: "",
      title: "",
      description: "",
      statusCode: "",
      employeeId: null,
      employeeName: "",
      dueDate: ""
    },
    redirectToViewPage: false
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

  handleChange = (name: string) => (event: any) => {
    let input = event.target.value;
    let devPlan;

    if (name === "title") {
      devPlan = { ...this.state.devPlan, title: input, id: input };
    } else if (name === "description") {
      devPlan = { ...this.state.devPlan, description: input };
    } else if (name === "asignee") {
      devPlan = { ...this.state.devPlan, employeeId: Number(input) };
    } else if (name === "dueDate") {
      console.log("Add date: ", input);
      devPlan = { ...this.state.devPlan, dueDate: input };
    } else if (name === "status") {
      devPlan = { ...this.state.devPlan, statusCode: input };
    }

    this.setState({ devPlan: devPlan });
  };

  handleSave = () => {
    console.log("Save...");

    this.setState({ redirectToViewPage: true });

    //update app state
    this.props.addDevPlan(this.state.devPlan);
  };

  handleCancel = () => {
    console.log("Cancel...");
    this.setState({ redirectToViewPage: true });
  };

  render() {
    const { redirectToViewPage } = this.state;

    return (
      <div>
        {redirectToViewPage && <Redirect to="/devPlans" />}
        <Grid container alignItems="center" style={{ flexGrow: 1 }}>
          <Grid item>
            <h2
              style={{
                paddingLeft: "20px",
                color: "rgba(73,155,234,1)"
              }}
            >
              Add Development Plan
            </h2>
          </Grid>
        </Grid>
        <Paper>
          <form noValidate autoComplete="off">
            <Grid
              container
              style={{
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "30px",
                paddingBottom: "30px"
              }}
            >
              <Grid
                container
                alignItems="center"
                spacing={32}
                style={{ flexGrow: 1 }}
              >
                <Grid item sm={6}>
                  <TextField
                    variant="outlined"
                    id="title"
                    label="Title"
                    value={this.state.devPlan.title}
                    onChange={this.handleChange("title")}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    variant="outlined"
                    id="description"
                    label="Description"
                    value={this.state.devPlan.description}
                    onChange={this.handleChange("description")}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    id="asignee"
                    label="Asignee"
                    value={this.state.devPlan.employeeId}
                    onChange={this.handleChange("asignee")}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    id="dueDate"
                    label="Due Date"
                    type="date"
                    value={this.state.devPlan.dueDate}
                    onChange={this.handleChange("dueDate")}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <StatusDropdown
                    onChange={this.handleChange}
                    value={this.state.devPlan.statusCode}
                  />
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <CardActions>
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
