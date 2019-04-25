import * as React from "react";

import Drawer from "@material-ui/core/Drawer";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

import { Status } from "../enums/StatusEnum";

type TData = {
  id: number;
  title: string;
  description: string;
  status: Status;
  asignee: string;
  dueDate: string;
};

type TState = {
  open: boolean;
  data: TData;
  disabled: boolean;
};

type TProps = {
  data: TData;
  toggleDrawer: any;
  closeDrawer: any;
};

export default class DetailsView extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = { open: true, data: this.props.data, disabled: true };
  }

  handleEdit = (event: any, tempData: TData) => {
    console.log("Edit...");

    this.setState({ data: tempData, disabled: !this.state.disabled });
    console.log(this.state.data);
  };

  handleChange = (name: string) => (event: any) => {
    console.log(name);
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
    const { toggleDrawer, closeDrawer } = this.props;
    const { data, disabled } = this.state;

    return (
      <Drawer
        anchor="right"
        open={this.state.open}
        onClose={event => toggleDrawer(event)}
      >
        <Card
          style={{
            background: "rgba(73,155,234,1)",
            width: "full",
            color: "white"
          }}
        >
          <CardContent>
            <div>
              <Typography variant="headline" style={{ color: "white" }}>
                {data.title}
              </Typography>
            </div>
            <br />
            <div>
              <Typography variant="caption" style={{ display: "inline-block" }}>
                Asignee
              </Typography>
              <Typography
                variant="button"
                style={{
                  display: "inline-block",
                  color: "white",
                  marginLeft: "10px"
                }}
              >
                {data.asignee}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" style={{ display: "inline-block" }}>
                Status
              </Typography>
              <Typography
                variant="button"
                style={{
                  display: "inline-block",
                  color: "white",
                  marginLeft: "10px"
                }}
              >
                {data.status}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" style={{ display: "inline-block" }}>
                Due Date
              </Typography>
              <Typography
                variant="button"
                style={{
                  display: "inline-block",
                  color: "white",
                  marginLeft: "10px"
                }}
              >
                {data.dueDate}
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Card>
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
              <Grid item xs={12}>
                <Typography variant="subheading">Details</Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="title"
                  label="Title"
                  value={data.title}
                  onChange={this.handleChange("title")}
                  margin="normal"
                  variant="outlined"
                  disabled={disabled}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="description"
                  label="Description"
                  value={data.description}
                  onChange={this.handleChange("description")}
                  margin="normal"
                  variant="outlined"
                  disabled={disabled}
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
                  disabled={disabled}
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
                  disabled={disabled}
                />
              </Grid>
              <Grid item xs={6}>
                {data.status === Status.NotStarted ? (
                  <Button
                    disabled
                    style={{ background: "red", color: "white" }}
                  >
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
        </Card>
        <Card>
          <CardActions>
            <Grid justify="flex-end" container>
              <IconButton onClick={event => this.handleEdit(event, data)}>
                <Edit />
              </IconButton>
              <IconButton onClick={event => closeDrawer(event)}>
                <Close />
              </IconButton>
            </Grid>
          </CardActions>
        </Card>
      </Drawer>
    );
  }
}
