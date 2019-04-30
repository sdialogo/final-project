import * as React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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

import MoreVertical from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";

import { Status } from "../../enums/StatusEnum";
import DetailsView from "./DevPlanDetailsView";
import EnhancedTableHead from "./DevPlanEnhancedTableHead";
import * as devPlanActions from "../../redux/actions/devPlanActions";
import * as employeeActions from "../../redux/actions/employeeActions";

type TData = {
  id: number;
  title: string;
  description: string;
  statusCode: string;
  employeeId: number;
  employeeName: string;
  dueDate: string;
};

type TState = {
  order: string;
  orderBy: string;
  selected: number[];
  // data: TData[];
  page: number;
  rowsPerPage: number;
  open: boolean;
  editData: TData;
  onDelete: boolean;
  toDelete: number;
  redirectToAddPage: boolean;
};

type TProps = {
  devPlans: TData[];
  actions: any;
  employees: any;
};

function findDataById(id: number, arr: TData[]): TData {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return arr[i];
    }
  }

  return {
    id: 0,
    title: "",
    description: "",
    statusCode: "",
    employeeId: 0,
    employeeName: "",
    dueDate: ""
  };
}

class DevPlanviewPage extends React.Component<TProps, TState> {
  state: TState = {
    order: "asc",
    orderBy: "title",
    selected: [],
    page: 0,
    rowsPerPage: 10,
    open: null,
    editData: {
      id: 0,
      title: "",
      description: "",
      employeeId: 0,
      employeeName: "",
      statusCode: "",
      dueDate: ""
    },
    onDelete: false,
    toDelete: 0,
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

  handleDrawerOpen = (event: any, id: number) => {
    event.stopPropagation();
    console.log("Drawer opened");
    // const { data } = this.state;
    let currData = findDataById(id, this.props.devPlans);

    this.setState({ editData: currData, open: true });
  };

  handleClose = (event: any) => {
    event.stopPropagation();
    console.log("Closing drawer...");
    this.setState({ open: false });
  };

  handleCloseDialog = () => {
    console.log("Delete cancelled");
    this.setState({ onDelete: false });
  };

  handleClickDelete = (event: any, id: number) => {
    console.log("Deleting data...");
    event.stopPropagation();

    this.setState({ onDelete: true, toDelete: id });
  };

  // handleDelete = () => {
  //   const { data, toDelete } = this.state;
  //   let deleteData: TData = findDataById(toDelete, data);

  //   this.setState({
  //     onDelete: false,
  //     data: data.filter(d => d !== deleteData)
  //   });
  //   console.log("Deleted");
  // };

  updateDataFromEditPage = (id: number, newData: TData) => {
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
      editData
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
                    <AddIcon />
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
                          <MoreVertical />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {/* {this.state.open ? (
              <DetailsView
                data={editData}
                toggleDrawer={this.handleToggle.bind(this)}
                closeDrawer={this.handleClose.bind(this)}
              />
            ) : (
              <div />
            )} */}
            {/* {this.state.onDelete ? (
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
            )} */}
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

function mapDispatchToProps(dispatch: any) {
  return {
    actions: {
      loadDevPlans: bindActionCreators(devPlanActions.loadDevPlans, dispatch),
      loadEmployees: bindActionCreators(employeeActions.loadEmployees, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DevPlanviewPage);
