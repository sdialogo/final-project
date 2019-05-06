import * as React from "react";
import { connect } from "react-redux";
import { TEmployee } from "../../common/types";
import {
  addEmployee,
  deleteEmployee
} from "../../redux/actions/employeeActions";

import {
  CardActions,
  Button,
  Grid,
  TextField,
  Divider
} from "@material-ui/core";

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
    let employee = { ...this.state.data, [name]: event.target.value };
    this.setState({ data: employee });
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
                id="firstName"
                label="First Name"
                value={data.firstName}
                onChange={this.handleChange("firstName")}
                margin="normal"
                variant="outlined"
                disabled={!isEdit}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: "90%" }}
                id="lastName"
                label="Last Name"
                value={data.lastName}
                onChange={this.handleChange("lastName")}
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
                id="middleName"
                label="Middle Name"
                value={data.middleName}
                onChange={this.handleChange("middleName")}
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
