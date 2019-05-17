import * as React from "react";
import EmployeeSubDetailsView from "./subDetailsView";
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
  toggleDrawer: Function;
  closeDrawer: Function;
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
};

const styles: TStyles = require("../../styles/employeeStyles.less");

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

  handleEdit = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    tempData: TEmployee
  ) => {
    this.setState({ data: tempData });
  };

  handleTabChange = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    tabValue: number
  ) => {
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
        <Card className={styles.detailsHeader}>
          <CardContent>
            <div>
              <Typography variant="headline" className={styles.textColor}>
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
                className={styles.tabsColor}
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
