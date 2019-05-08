import * as React from "react";

import SubDetailsView from "./DevPlanSubDetailsView";
import { TDevPlan } from "../../common/types";

import {
  Drawer,
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  AppBar,
  Tabs,
  Tab
} from "@material-ui/core";

type TState = {
  open: boolean;
  data: TDevPlan;
  enableEdit: boolean;
  tabValue: number;
};

type TProps = {
  data: TDevPlan;
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

type TStyles = {
  textColor: string;
  detailsHeader: string;
  tabsColor: string;
  displayButton: string;
};

const styles: TStyles = require("./DevPlanStyles.less");

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

  handleEdit = (event: any, tempData: TDevPlan) => {
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
        <Card className={styles.detailsHeader}>
          <CardContent>
            <div>
              <Typography variant="headline" className={styles.textColor}>
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
                    <Typography
                      variant="subheading"
                      className={styles.textColor}
                    >
                      Asignee
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button disabled className={styles.displayButton}>
                      {data.employeeName}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={8}>
                  <Grid item>
                    <Typography
                      variant="subheading"
                      className={styles.textColor}
                    >
                      Status
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button disabled className={styles.displayButton}>
                      {data.statusCode}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={8}>
                  <Grid item>
                    <Typography
                      variant="subheading"
                      className={styles.textColor}
                    >
                      Due Date
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button disabled className={styles.displayButton}>
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
                className={styles.tabsColor}
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
