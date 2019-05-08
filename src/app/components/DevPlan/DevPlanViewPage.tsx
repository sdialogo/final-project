import * as React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import EnhancedToolbar from "../../common/EnhancedToolbar";
import DetailsView from "./DevPlanDetailsView";
import EnhancedTableHead from "../../common/EnhancedTableHead";
import { devPlanRows } from "../../common/constants";

import {
  loadDevPlans,
  deleteDevPlan
} from "../../redux/actions/devPlanActions";
import { loadEmployees } from "../../redux/actions/employeeActions";

import { TDevPlan } from "../../common/types";
import { findDataById } from "../../common/functions";

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
  IconButton
} from "@material-ui/core";

import { MoreVert, Add } from "@material-ui/icons";

type TState = {
  data: TDevPlan[];
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
  employees: any;
  loadDevPlans: any;
  loadEmployees: any;
  deleteDevPlan: any;
};

class DevPlanviewPage extends React.Component<TProps, TState> {
  state: TState = {
    data: this.props.devPlans,
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
    const { devPlans, employees, loadDevPlans, loadEmployees } = this.props;

    if (devPlans.length === 0) {
      loadDevPlans().catch((error: any) => {
        alert("Loading dev plans failed: " + error);
      });
    }

    if (employees.length === 0) {
      loadEmployees().catch((error: any) => {
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
    this.props.deleteDevPlan(this.state.toDelete);
    console.log("Deleted");
  };

  handleRedirectToAddPage = () => {
    this.setState({ redirectToAddPage: true });
  };

  handleDataFilter = (event: any) => {
    const filteredData = this.state.data.filter(d =>
      d.title.includes(event.target.value)
    );

    this.setState({ data: filteredData });
  };

  handleClearSearch = () => {
    this.setState({ data: this.props.devPlans });
  };

  render() {
    const {
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      ediTDevPlan
    } = this.state;
    return (
      <div>
        <EnhancedToolbar
          title="Development Plan"
          redirectToAddPage={this.handleRedirectToAddPage.bind(this)}
          dataFilter={this.handleDataFilter.bind(this)}
          clearSearch={this.handleClearSearch.bind(this)}
        />
        {this.state.redirectToAddPage && <Redirect to="/addDevPlan" />}
        <Paper>
          <div>
            <Table aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rows={devPlanRows}
              />
              <TableBody>
                {data.map(n => {
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleDrawerOpen(event, n.id)}
                      role="checkbox"
                      tabIndex={-1}
                      key={n.id}
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
                (a: any) => a.id === devPlan.employeeId
              ).fullName
            };
          }),
    employees: state.employees
  };
}

const mapDispatchToProps = {
  loadDevPlans,
  loadEmployees,
  deleteDevPlan
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DevPlanviewPage);
