import * as React from "react";

import Drawer from "@material-ui/core/Drawer";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { Status } from "../enums/StatusEnum";
import SubDetailsView from "./SubDetailsView";

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
  enableEdit: boolean;
  tabValue: number;
};

type TProps = {
  data: TData;
  toggleDrawer: any;
  closeDrawer: any;
};

function TabContainer(props: any) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

export default class DetailsView extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      open: true,
      data: this.props.data,
      enableEdit: true,
      tabValue: 0
    };
  }

  handleEdit = (event: any, tempData: TData) => {
    this.setState({ data: tempData });
  };

  handleTabChange = (event: any, tabValue: number) => {
    this.setState({ tabValue });
  };

  render() {
    const { toggleDrawer, closeDrawer } = this.props;
    const { data, tabValue } = this.state;

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
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              spacing={24}
            >
              <Grid item>
                <Grid container spacing={8}>
                  <Grid item>
                    <Typography variant="subheading" style={{ color: "white" }}>
                      Asignee
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      disabled
                      style={{
                        background: "white",
                        color: "grey"
                      }}
                    >
                      {data.asignee}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={8}>
                  <Grid item>
                    <Typography variant="subheading" style={{ color: "white" }}>
                      Status
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      disabled
                      style={{
                        background: "white",
                        color: "grey"
                      }}
                    >
                      {data.status}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={8}>
                  <Grid item>
                    <Typography variant="subheading" style={{ color: "white" }}>
                      Due Date
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      disabled
                      style={{
                        background: "white",
                        color: "grey"
                      }}
                    >
                      {data.dueDate}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <Grid item xs={12}>
            <AppBar position="static">
              <Tabs
                value={tabValue}
                onChange={this.handleTabChange}
                variant="fullWidth"
                style={{ background: "#a8aeb7" }}
                onClick={event => this.handleEdit(event, data)}
              >
                <Tab label="View Details" />
                <Tab label="Edit Details" />
              </Tabs>
            </AppBar>
            {tabValue === 0 && (
              <TabContainer>
                <SubDetailsView
                  data={data}
                  isEdit={false}
                  closeDrawer={closeDrawer.bind(this)}
                  tabValue={tabValue}
                />
              </TabContainer>
            )}
            {tabValue === 1 && (
              <TabContainer>
                <SubDetailsView
                  data={data}
                  isEdit={true}
                  closeDrawer={closeDrawer.bind(this)}
                  tabValue={tabValue}
                />
              </TabContainer>
            )}
          </Grid>
        </Card>
      </Drawer>
    );
  }
}
