import * as React from "react";
import { connect } from "react-redux";
import {
  addEmployee,
  deleteEmployee
} from "../../redux/actions/employeeActions";

import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";

import { Status } from "../../common/StatusEnum";
import StatusDropdown from "../StatusDropdown";

type TEmployee = {
  id: any;
  firstName: string;
  lastName: string;
  middleName: string;
  fullName: string;
  archived: boolean;
  hireDate: string;
};

type TProps = {
  data: TEmployee;
  isEdit: boolean;
  closeDrawer: any;
  tabValue: number;
  addEmployee: any;
  deleteEmployee: any;
};

type TState = {
  data: TEmployee;
};

function getFullName(data: TEmployee) {
  let fullName = data.firstName
    .concat(" ")
    .concat(data.middleName)
    .concat(" ")
    .concat(data.lastName);

  return fullName;
}

class EmployeeSubViewPage extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  handleSave = () => {
    console.log("Edit...");
    //update app state; delete then add
    this.props.deleteEmployee(this.state.data.id);
    this.props.addEmployee(this.state.data);

    this.props.closeDrawer(event);
  };

  handleChange = (name: string) => (event: any) => {
    let newData: TEmployee = { ...this.state.data };
    let input = event.target.value;

    if (name === "firstname") {
      newData.firstName = input;
    } else if (name === "lastname") {
      newData.lastName = input;
    } else if (name === "middlename") {
      newData.middleName = input;
    } else if (name === "hireDate") {
      newData.hireDate = input;
    } else if (name === "archived") {
      newData.archived = input;
    }

    let fullName = getFullName(newData);
    newData.fullName = fullName;

    this.setState({ data: newData });
  };
  render() {
    const { isEdit, closeDrawer, tabValue } = this.props;
    const { data } = this.state;
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
                id="firstname"
                label="First Name"
                value={data.firstName}
                onChange={this.handleChange("firstname")}
                margin="normal"
                variant="outlined"
                disabled={!isEdit}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: "90%" }}
                id="lastname"
                label="Last Name"
                value={data.lastName}
                onChange={this.handleChange("lastname")}
                margin="normal"
                variant="outlined"
                disabled={!isEdit}
                multiline
                // rows={4}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: "90%" }}
                id="middlename"
                label="Middle Name"
                value={data.middleName}
                onChange={this.handleChange("middlename")}
                margin="normal"
                variant="outlined"
                disabled={!isEdit}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: "90%" }}
                id="hireDate"
                label="Hire Date"
                type="date"
                value={data.hireDate}
                onChange={this.handleChange("hireDate")}
                margin="normal"
                variant="outlined"
                disabled={!isEdit}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: "90%" }}
                id="archived"
                label="Archived"
                value={data.archived}
                onChange={this.handleChange("archived")}
                margin="normal"
                variant="outlined"
                disabled={!isEdit}
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
    employees: state.employees
  };
}

const mapDispatchToProps = {
  addEmployee,
  deleteEmployee
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeSubViewPage);
