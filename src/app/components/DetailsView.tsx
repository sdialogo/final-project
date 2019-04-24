import * as React from "react";
import Drawer from "@material-ui/core/Drawer";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

import { styled } from "@material-ui/styles";
import { Status } from "../enums/StatusEnum";

type TData = {
  id: number;
  title: string;
  asignee: string;
  status: Status;
  dueDate: string;
};

type TState = {
  open: boolean;
};

type TProps = {
  data: TData;
  toggleDrawer: any;
  closeDrawer: any;
};

const HeaderCard = styled(Card)({
  background: "rgba(73,155,234,1)",
  width: 700,
  color: "white"
});

export default class DetailsView extends React.Component<TProps, TState> {
  state: TState = {
    open: true
  };

  render() {
    const { data, toggleDrawer, closeDrawer } = this.props;

    return (
      <Drawer
        anchor="right"
        open={this.state.open}
        onClose={event => toggleDrawer(event)}
      >
        <HeaderCard>
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
        </HeaderCard>
        <Card>
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
              <Typography component="p" variant="subtitle2">
                Title
                <br />
                {data.title}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography component="p" variant="subtitle2">
                Description
                <br />
                string
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography component="p" variant="subtitle2">
                Due Date
                <br />
                {data.dueDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography component="p" variant="subtitle2">
                Completed Date
                <br />-
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {data.status === Status.NotStarted ? (
                <Button style={{ background: "red", color: "white" }}>
                  {data.status}
                </Button>
              ) : data.status === Status.Done ? (
                <Button
                  style={{
                    background: "green",
                    color: "white"
                  }}
                >
                  {data.status}
                </Button>
              ) : (
                <Button
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
        </Card>
        <Card>
          <CardActions>
            <Grid justify="flex-end" container>
              <IconButton>
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
