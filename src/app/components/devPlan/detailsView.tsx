import * as React from "react";
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
import SubDetailsView from "./subDetailsView";
import { TDevPlan } from "../../common/types";

type TState = {
  open: boolean;
  data: TDevPlan;
  enableEdit: boolean;
  tabValue: number;
};

type TProps = {
  data: TDevPlan;
  toggleDrawer(): void;
  closeDrawer(event: React.MouseEvent, button: string): void;
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

const styles: TStyles = require("../../styles/devPlanStyles.less");

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

  handleEdit = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    tempData: TDevPlan
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

    return (
      <Drawer
        anchor="right"
        open={this.state.open}
        onClose={event => toggleDrawer()}
      >
        <Card className={styles.detailsHeader}>
          <CardContent>
            <div>
              <Typography variant="headline" className={styles.textColor}>
                {data.title}
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
