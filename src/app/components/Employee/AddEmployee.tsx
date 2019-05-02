import * as React from "react";
import { Redirect } from "react-router";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import { Status } from "../../enums/StatusEnum";
import StatusDropdown from "../StatusDropdown";

type TState = {
  firstName: string;
  lastName: string;
  middleName: string;
  archived: boolean;
  hireDate: string;
  redirectToViewPage: boolean;
};

export default class AddEmployee extends React.Component<{}, TState> {
  state: TState = {
    firstName: "",
    lastName: "",
    middleName: "",
    archived: false,
    hireDate: "",
    redirectToViewPage: false
  };

  handleChange = (name: string) => (event: any) => {
    let input = event.target.value;
    console.log(input);

    if (name === "firstname") {
      this.setState({ firstName: input });
    } else if (name === "lastname") {
      this.setState({ lastName: input });
    } else if (name === "middlename") {
      this.setState({ middleName: input });
    } else if (name === "hiredate") {
      this.setState({ hireDate: input });
    }
  };

  handleSave = () => {
    console.log("Save...");
    //update app state
    this.setState({ redirectToViewPage: true });
  };

  handleCancel = () => {
    console.log("Cancel...");
    this.setState({ redirectToViewPage: true });
  };

  render() {
    const { redirectToViewPage } = this.state;

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
                    value={this.state.firstName}
                    onChange={this.handleChange("firstname")}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    id="lastname"
                    label="Last Name"
                    value={this.state.lastName}
                    onChange={this.handleChange("lastname")}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="middlename"
                    label="Middle Name"
                    value={this.state.middleName}
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
                    value={this.state.hireDate}
                    onChange={this.handleChange("hiredate")}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                {/* <Grid item xs={6}>
                  <StatusDropdown onChange={this.handleChange} value={this.state.sta} />
                </Grid> */}
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
