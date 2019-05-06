import * as React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { loadDevPlans, addDevPlan } from "../../redux/actions/devPlanActions";
import { loadEmployees } from "../../redux/actions/employeeActions";

import StatusDropdown from "../StatusDropdown";
import { TDevPlan } from "../../common/types";

import { Grid, TextField, Paper, CardActions, Button } from "@material-ui/core";

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

  handleChange = (name: any) => (event: any) => {
    let devPlan = { ...this.state.devPlan, [name]: event.target.value };

    this.setState({ devPlan: devPlan });
  };

  handleSave = () => {
    console.log("Save...");

    this.setState({ redirectToViewPage: true });
    this.props.addDevPlan(this.state.devPlan);
  };

  handleCancel = () => {
    console.log("Cancel...");
    this.setState({ redirectToViewPage: true });
  };

  render() {
    const { redirectToViewPage, devPlan } = this.state;

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
                    value={devPlan.title}
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
                    value={devPlan.description}
                    onChange={this.handleChange("description")}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    id="employeeId"
                    label="Asignee"
                    value={devPlan.employeeId}
                    onChange={this.handleChange("employeeId")}
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
                    value={devPlan.dueDate}
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
                    value={devPlan.statusCode}
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
