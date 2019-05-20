import * as React from "react";
import {
  loadEmployees,
  deleteEmployee
} from "../../redux/actions/employeeActions";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import CustomizedSnackbars from "../shared/snackbars";

import EmployeeDetailsView from "./detailsView";
import EnhancedTableHead from "../shared/enhancedTableHead";
import EnhancedToolbar from "../shared/enhancedToolbar";
import { employeeRows } from "../../common/constants";
import { TEmployee, TAppState } from "../../common/types";
import {
  findEmployeeById,
  formatDate,
  sortEmployeeTableContentById
} from "../../common/functions";

import DeleteTwoTone from "@material-ui/icons/DeleteTwoTone";
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
  IconButton,
  TablePagination
} from "@material-ui/core";

type TState = {
  data: TEmployee[];
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
  isSearch: boolean;
  isAddSuccess: boolean;
  isEditSuccess: boolean;
};

type TProps = {
  employees: TEmployee[];
  loadEmployees: Function;
  deleteEmployee: Function;
};

class EmployeeViewPage extends React.Component<TProps, TState> {
  state: TState = {
    data: this.props.employees,
    order: "asc",
    orderBy: "lastName",
    selected: [],
    page: 0,
    rowsPerPage: 5,
    open: false,
    editData: {
      id: null,
      firstName: "",
      lastName: "",
      middleName: "",
      fullName: "",
      archived: false,
      hireDate: ""
    },
    onDelete: false,
    toDelete: 0,
    redirectToAddPage: false,
    isSearch: false,
    isAddSuccess: false,
    isEditSuccess: false
  };

  componentDidMount() {
    const { employees, loadEmployees } = this.props;

    if (employees.length === 0) {
      loadEmployees().catch((error: string) => {
        alert("Loading employees failed: " + error);
      });
    }
  }
  handleRequestSort = (
    event: React.ChangeEvent<HTMLInputElement>,
    property: string
  ) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleToggle = () => this.setState({ open: !this.state.open });

  handleDrawerOpen = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    id: number
  ) => {
    event.stopPropagation();
    let currData = findEmployeeById(id, this.props.employees);

    this.setState({ editData: currData, open: true });
  };

  handleClose = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    button: string
  ) => {
    event.stopPropagation();

    if (button === "close") {
      this.setState({ open: false });
    } else {
      this.setState({ open: false, isEditSuccess: true });
    }
  };

  handleCloseDialog = () => {
    console.log("Delete cancelled");
    this.setState({ onDelete: false });
  };

  handleClickDelete = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number
  ) => {
    console.log("Deleting data...");
    event.stopPropagation();

    this.setState({ onDelete: true, toDelete: id });
  };

  handleDelete = () => {
    this.setState({ onDelete: false });

    this.props.deleteEmployee(this.state.toDelete);
    console.log("Deleted");
  };

  handleRedirectToAddPage = () => {
    this.setState({ redirectToAddPage: true });
  };

  handleDataFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredData = this.state.data.filter(
      d =>
        d.firstName.includes(event.target.value) ||
        d.middleName.includes(event.target.value) ||
        d.lastName.includes(event.target.value)
    );

    this.setState({ data: filteredData, isSearch: true });
  };

  handleClearSearch = () => {
    this.setState({ data: this.props.employees, isSearch: false });
  };

  handleCloseSnackbar = () => {
    this.setState({ isEditSuccess: false });
  };

  handleChangePage(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) {
    this.setState({ page: newPage });
  }

  handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ rowsPerPage: Number(event.target.value) });
  }

  render() {
    const {
      data,
      order,
      orderBy,
      selected,
      editData,
      isSearch,
      isAddSuccess,
      isEditSuccess,
      page,
      rowsPerPage
    } = this.state;

    let tableContent = data;
    {
      isSearch ? (tableContent = data) : (tableContent = this.props.employees);
    }
    return (
      <div>
        <EnhancedToolbar
          title="Employee"
          redirectToAddPage={this.handleRedirectToAddPage.bind(this)}
          dataFilter={this.handleDataFilter.bind(this)}
          clearSearch={this.handleClearSearch.bind(this)}
        />
        {this.state.redirectToAddPage && <Redirect to="/addEmployee" />}
        {isAddSuccess && (
          <CustomizedSnackbars
            message="Successfully added new employee"
            variant="success"
          />
        )}
        {isEditSuccess && (
          <CustomizedSnackbars
            message="Successfully edited employee"
            variant="success"
            onClose={this.handleCloseSnackbar.bind(this)}
          />
        )}
        <Paper>
          <div>
            <Table aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rows={employeeRows}
              />
              <TableBody>
                {tableContent
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleDrawerOpen(event, n.id)}
                        role="checkbox"
                        tabIndex={-1}
                        key={n.id}
                      >
                        <TableCell align="left">{n.lastName}</TableCell>
                        <TableCell align="left">{n.firstName}</TableCell>
                        <TableCell align="left">{n.middleName}</TableCell>
                        <TableCell align="left">
                          {formatDate(n.hireDate)}
                        </TableCell>
                        <TableCell align="left">
                          <IconButton
                            onClick={event =>
                              this.handleClickDelete(event, n.id)
                            }
                          >
                            <DeleteTwoTone />
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={tableContent.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={this.handleChangePage.bind(this)}
            onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
          />
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state: TAppState) {
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
