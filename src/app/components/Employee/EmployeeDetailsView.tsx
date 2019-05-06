import * as React from "react";
import EmployeeSubDetailsView from "./EmployeeSubDetailsView";
import { TEmployee } from "../../common/types";

import {
  Drawer,
  Grid,
  CardContent,
  Card,
  Typography,
  AppBar,
  Tabs,
  Tab
} from "@material-ui/core";

type TState = {
  open: boolean;
  data: TEmployee;
  enableEdit: boolean;
  tabValue: number;
};

type TProps = {
  data: TEmployee;
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

class EmployeeDetailsView extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      open: true,
      data: this.props.data,
      enableEdit: true,
      tabValue: 0
    };
  }

  handleEdit = (event: any, tempData: TEmployee) => {
    this.setState({ data: tempData });
  };

  handleTabChange = (event: any, tabValue: number) => {
    this.setState({ tabValue });
  };

  render() {
    const { toggleDrawer, closeDrawer } = this.props;
    const { data, tabValue } = this.state;
    const fullName = data.fullName;
    const displayName = fullName.toUpperCase();

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
                {displayName}
              </Typography>
            </div>
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
                <EmployeeSubDetailsView
                  data={data}
                  isEdit={false}
                  closeDrawer={closeDrawer.bind(this)}
                  tabValue={tabValue}
                />
              </TabContainer>
            )}
            {tabValue === 1 && (
              <TabContainer>
                <EmployeeSubDetailsView
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

export default EmployeeDetailsView;
