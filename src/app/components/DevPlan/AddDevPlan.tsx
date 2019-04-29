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
  title: string;
  description: string;
  status: Status;
  asignee: string;
  dueDate: string;
  redirectToViewPage: any;
};

export default class AddDevPlan extends React.Component<{}, TState> {
  state: TState = {
    title: "",
    description: "",
    status: Status.Blank,
    asignee: "",
    dueDate: "",
    redirectToViewPage: false
  };

  handleChange = (name: string) => (event: any) => {
    let input = event.target.value;
    console.log(input);

    if (name === "title") {
      this.setState({ title: input });
    } else if (name === "description") {
      this.setState({ description: input });
    } else if (name === "asignee") {
      this.setState({ asignee: input });
    } else if (name === "dueDate") {
      this.setState({ dueDate: input });
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
                    id="title"
                    label="Title"
                    value={this.state.title}
                    onChange={this.handleChange("title")}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    id="description"
                    label="Description"
                    value={this.state.description}
                    onChange={this.handleChange("description")}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="asignee"
                    label="Asignee"
                    value={this.state.asignee}
                    onChange={this.handleChange("asignee")}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="dueDate"
                    label="Due Date"
                    value={this.state.dueDate}
                    onChange={this.handleChange("dueDate")}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <StatusDropdown />
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
