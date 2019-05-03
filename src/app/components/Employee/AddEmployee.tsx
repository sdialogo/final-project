import * as React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import {
  loadEmployees,
  addEmployee
} from "../../redux/actions/employeeActions";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import { Status } from "../../enums/StatusEnum";
import StatusDropdown from "../StatusDropdown";

type TEmployee = {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  fullName: string;
  archived: boolean;
  hireDate: string;
};

type TState = {
  employee: TEmployee;
  redirectToViewPage: boolean;
};

type TProps = {
  loadEmployees: any;
  addEmployee: any;
};

function getFullName(data: TEmployee) {
  let fullName = data.firstName
    .concat(" ")
    .concat(data.middleName)
    .concat(" ")
    .concat(data.lastName);

  return fullName;
}

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

  handleChange = (name: string) => (event: any) => {
    let newData: TEmployee = { ...this.state.employee };
    let input = event.target.value;

    if (name === "firstname") {
      newData.firstName = input;
    } else if (name === "lastname") {
      newData.lastName = input;
    } else if (name === "middlename") {
      newData.middleName = input;
    } else if (name === "hiredate") {
      newData.hireDate = input;
    } else if (name === "archived") {
      newData.archived = input;
    }

    let fullName = getFullName(newData);
    newData.fullName = fullName;
    newData.id = fullName;

    this.setState({ employee: newData });
  };

  handleSave = () => {
    console.log("Save...");

    this.setState({ redirectToViewPage: true });
    //update app state
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
                    id="firstname"
                    label="First Name"
                    value={employee.firstName}
                    onChange={this.handleChange("firstname")}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    id="lastname"
                    label="Last Name"
                    value={employee.lastName}
                    onChange={this.handleChange("lastname")}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="middlename"
                    label="Middle Name"
                    value={employee.middleName}
                    onChange={this.handleChange("middlename")}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="hiredate"
                    label="Hire Date"
                    type="date"
                    value={employee.hireDate}
                    onChange={this.handleChange("hiredate")}
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
