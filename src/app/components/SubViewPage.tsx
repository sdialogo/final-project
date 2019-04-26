import * as React from "react";

import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";

import { Status } from "../enums/StatusEnum";

type TData = {
  id: number;
  title: string;
  description: string;
  status: Status;
  asignee: string;
  dueDate: string;
};

type TProps = {
  data: TData;
  isEdit: boolean;
  closeDrawer: any;
  tabValue: number;
};

type TState = {
  data: TData;
};

export default class SubViewPage extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  handleSave = () => {
    //update app state
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
    }
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
              marginLeft: "10px",
              marginTop: "5px",
              marginBottom: "5px"
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
                rows={4}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="dueDate"
                label="Due Date"
                value={data.dueDate}
                onChange={this.handleChange("dueDate")}
                margin="normal"
                variant="outlined"
                disabled={!isEdit}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="dateCompleted"
                label="Date Completed"
                value={data.dueDate}
                onChange={this.handleChange("dateCompleted")}
                margin="normal"
                variant="outlined"
                disabled={!isEdit}
              />
            </Grid>
            <Grid item xs={6}>
              {data.status === Status.NotStarted ? (
                <Button disabled style={{ background: "red", color: "white" }}>
                  {data.status}
                </Button>
              ) : data.status === Status.Done ? (
                <Button
                  disabled
                  style={{
                    background: "green",
                    color: "white"
                  }}
                >
                  {data.status}
                </Button>
              ) : (
                <Button
                  disabled
                  style={{
                    background: "orange",
                    color: "white"
                  }}
                >
                  {data.status}
                </Button>
              )}
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
