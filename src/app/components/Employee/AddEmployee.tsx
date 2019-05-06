import * as React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import {
  loadEmployees,
  addEmployee
} from "../../redux/actions/employeeActions";

import { Grid, TextField, Paper, CardActions, Button } from "@material-ui/core";

import { TEmployee } from "../../common/types";
import { getFullName } from "../../common/functions";

type TState = {
  employee: TEmployee;
  redirectToViewPage: boolean;
};

type TProps = {
  loadEmployees: any;
  addEmployee: any;
};

class AddEmployee extends React.Component<TProps, TState> {
  state: TState = {
    employee: {
      id: "",
      firstName: "",
      lastName: "",
      middleName: "",
      fullName: "",
      archived: false,
      hireDate: ""
    },
    redirectToViewPage: false
  };

  handleChange = (name: any) => (event: any) => {
    let employee = { ...this.state.employee, [name]: event.target.value };

    let fullName = getFullName(employee);
    employee.fullName = fullName;
    employee.id = fullName;

    this.setState({ employee: employee });
  };

  handleSave = () => {
    console.log("Save...");

    this.setState({ redirectToViewPage: true });
    this.props.addEmployee(this.state.employee);
  };

  handleCancel = () => {
    console.log("Cancel...");
    this.setState({ redirectToViewPage: true });
  };

  render() {
    const { redirectToViewPage, employee } = this.state;

    return (
      <div>
        {redirectToViewPage && <Redirect to="/employees" />}
        <Grid container alignItems="center" style={{ flexGrow: 1 }}>
          <Grid item>
            <h2
              style={{
                paddingLeft: "20px",
                color: "rgba(73,155,234,1)"
              }}
            >
              Add Employee
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
                    id="firstName"
                    label="First Name"
                    value={employee.firstName}
                    onChange={this.handleChange("firstName")}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    id="lastName"
                    label="Last Name"
                    value={employee.lastName}
                    onChange={this.handleChange("lastName")}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="middleName"
                    label="Middle Name"
                    value={employee.middleName}
                    onChange={this.handleChange("middleName")}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="hireDate"
                    label="Hire Date"
                    type="date"
                    value={employee.hireDate}
                    onChange={this.handleChange("hireDate")}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="archived"
                    label="Archived"
                    value={employee.archived}
                    onChange={this.handleChange("archived")}
                    margin="normal"
                    fullWidth
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
