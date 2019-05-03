import * as React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as devPlanActions from "../../redux/actions/devPlanActions";
import * as employeeActions from "../../redux/actions/employeeActions";

import { TDevPlan } from "../../common/types";
import { findDataById } from "../../common/functions";

import DetailsView from "./DevPlanDetailsView";
import EnhancedTableHead from "./DevPlanEnhancedTableHead";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Grid,
  IconButton
} from "@material-ui/core";

import { MoreVert, Add } from "@material-ui/icons";

type TState = {
  order: string;
  orderBy: string;
  selected: number[];
  page: number;
  rowsPerPage: number;
  open: boolean;
  ediTDevPlan: TDevPlan;
  onDelete: boolean;
  toDelete: string;
  redirectToAddPage: boolean;
};

type TProps = {
  devPlans: TDevPlan[];
  actions: any;
  employees: any;
};

class DevPlanviewPage extends React.Component<TProps, TState> {
  state: TState = {
    order: "asc",
    orderBy: "title",
    selected: [],
    page: 0,
    rowsPerPage: 10,
    open: null,
    ediTDevPlan: {
      id: "",
      title: "",
      description: "",
      employeeId: null,
      employeeName: "",
      statusCode: "",
      dueDate: ""
    },
    onDelete: false,
    toDelete: "",
    redirectToAddPage: false
  };

  componentDidMount() {
    const { devPlans, employees, actions } = this.props;

    if (devPlans.length === 0) {
      actions.loadDevPlans().catch((error: any) => {
        alert("Loading dev plans failed: " + error);
      });
    }

    if (employees.length === 0) {
      actions.loadEmployees().catch((error: any) => {
        alert("Loading employees failed: " + error);
      });
    }
  }

  handleRequestSort = (event: any, property: any) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleToggle = () => this.setState({ open: !this.state.open });

  handleDrawerOpen = (event: any, id: string) => {
    event.stopPropagation();
    let currData = findDataById(id, this.props.devPlans);

    this.setState({ ediTDevPlan: currData, open: true });
  };

  handleClose = (event: any) => {
    event.stopPropagation();
    this.setState({ open: false });
  };

  handleCloseDialog = () => {
    console.log("Delete cancelled");
    this.setState({ onDelete: false });
  };

  handleClickDelete = (event: any, id: string) => {
    console.log("Deleting data...");
    event.stopPropagation();

    this.setState({ onDelete: true, toDelete: id });
  };

  handleDelete = () => {
    this.setState({ onDelete: false });

    //update app state
    this.props.actions.deleteDevPlan(this.state.toDelete);
    console.log("Deleted");
  };

  updateDataFromEditPage = (id: any, newData: TDevPlan) => {
    //delete current data with same id
    //push new data from eit page
  };

  handleRedirectToAddPage = () => {
    this.setState({ redirectToAddPage: true });
  };

  getEmployeeName = (id: number) => {
    const employee = this.props.employees.find((a: any) => a.id === id);
    console.log(employee);
  };

  render() {
    const {
      // data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      ediTDevPlan
    } = this.state;
    return (
      <div>
        <div>
          <Grid container alignItems="center" style={{ flexGrow: 1 }}>
            <Grid item xs={6}>
              <h2 style={{ marginLeft: "25px", color: "rgba(73,155,234,1)" }}>
                Development Plan
              </h2>
            </Grid>
            <Grid item xs={6}>
              <Grid
                container
                spacing={16}
                alignItems="center"
                direction="row"
                justify="flex-end"
                style={{ height: 80 }}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    style={{ background: "rgba(73,155,234,1)", color: "white" }}
                  >
                    Search
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    style={{ background: "rgba(73,155,234,1)", color: "white" }}
                    onClick={this.handleRedirectToAddPage}
                  >
                    Add
                    <Add />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        {this.state.redirectToAddPage && <Redirect to="/addDevPlan" />}
        <Paper>
          <div>
            <Table aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                // onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                // rowCount={data.length}
              />
              <TableBody>
                {this.props.devPlans.map(n => {
                  // const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleDrawerOpen(event, n.id)}
                      role="checkbox"
                      // aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      // selected={isSelected}
                    >
                      <TableCell align="left">{n.title}</TableCell>
                      <TableCell align="left">{n.employeeName}</TableCell>
                      <TableCell align="left">{n.statusCode}</TableCell>
                      <TableCell align="left">{n.dueDate}</TableCell>
                      <TableCell align="left">
                        <IconButton
                          onClick={event => this.handleClickDelete(event, n.id)}
                        >
                          <MoreVert />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {this.state.open ? (
              <DetailsView
                data={ediTDevPlan}
                toggleDrawer={this.handleToggle.bind(this)}
                closeDrawer={this.handleClose.bind(this)}
              />
            ) : (
              <div />
            )}
            {this.state.onDelete ? (
              <div>
                <Dialog
                  open={this.state.onDelete}
                  onClose={this.handleCloseDialog}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to delete this data?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={this.handleDelete}
                      color="primary"
                      autoFocus
                    >
                      Delete
                    </Button>
                    <Button onClick={this.handleCloseDialog} color="primary">
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            ) : (
              ""
            )}
          </div>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    devPlans:
      state.employees.length === 0
        ? []
        : state.devPlans.map((devPlan: any) => {
            return {
              ...devPlan,
              employeeName: state.employees.find(
                (a: any) => a.id === Number(devPlan.employeeId)
              ).fullName
            };
          }),
    employees: state.employees
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    actions: {
      loadDevPlans: bindActionCreators(devPlanActions.loadDevPlans, dispatch),
      loadEmployees: bindActionCreators(
        employeeActions.loadEmployees,
        dispatch
      ),
      deleteDevPlan: bindActionCreators(devPlanActions.deleteDevPlan, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DevPlanviewPage);
