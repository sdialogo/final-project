import * as React from "react";
import {
  loadEmployees,
  deleteEmployee
} from "../../redux/actions/employeeActions";
import { Redirect } from "react-router";
import { connect } from "react-redux";

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
  Grid
} from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import MoreVertical from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";

import EmployeeDetailsView from "./EmployeeDetailsView";
import EnhancedTableHead from "../../common/EnhancedTableHead";
import { employeeRows } from "../../common/constants";
import { TEmployee } from "../../common/types";
import { findEmployeeById } from "../../common/functions";

type TState = {
  order: string;
  orderBy: string;
  selected: number[];
  page: number;
  rowsPerPage: number;
  open: boolean;
  editData: TEmployee;
  onDelete: boolean;
  toDelete: number;
  redirectToAddPage: boolean;
};

type TProps = {
  employees: TEmployee[];
  loadEmployees: any;
  deleteEmployee: any;
};

type TStyles = {
  texColor: string;
};

const styles: TStyles = require("./EmployeeStyles.less");

class EmployeeViewPage extends React.Component<TProps, TState> {
  state: TState = {
    order: "asc",
    orderBy: "lastName",
    selected: [],
    page: 0,
    rowsPerPage: 10,
    open: null,
    editData: {
      id: "",
      firstName: "",
      lastName: "",
      middleName: "",
      fullName: "",
      archived: false,
      hireDate: ""
    },
    onDelete: false,
    toDelete: 0,
    redirectToAddPage: false
  };

  componentDidMount() {
    const { employees, loadEmployees } = this.props;

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

  handleDrawerOpen = (event: any, id: number) => {
    event.stopPropagation();
    console.log("Drawer opened");
    // const { data } = this.state;
    let currData = findEmployeeById(id, this.props.employees);

    this.setState({ editData: currData, open: true });
  };

  handleClose = (event: any) => {
    event.stopPropagation();
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

  handleDelete = () => {
    this.setState({ onDelete: false });

    //update app state
    this.props.deleteEmployee(this.state.toDelete);
    console.log("Deleted");
  };

  handleRedirectToAddPage = () => {
    this.setState({ redirectToAddPage: true });
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
                Employee
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
        {this.state.redirectToAddPage && <Redirect to="/addEmployee" />}
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
                rows={employeeRows}
              />
              <TableBody>
                {this.props.employees.map((n: any) => {
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
                      <TableCell align="left" className={styles.texColor}>
                        {n.lastName}
                      </TableCell>
                      <TableCell align="left">{n.firstName}</TableCell>
                      <TableCell align="left">{n.middleName}</TableCell>
                      <TableCell align="left">{n.hireDate}</TableCell>
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
            {this.state.open ? (
              <EmployeeDetailsView
                data={editData}
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
    employees: state.employees
  };
}

const mapDispatchToProps = {
  loadEmployees,
  deleteEmployee
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeViewPage);
