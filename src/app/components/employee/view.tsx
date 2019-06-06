import * as React from "react";
import {
  loadEmployees,
  deleteEmployee
} from "../../redux/actions/employeeActions";
import {
  loadDevPlans,
  deleteDevPlanSuccess
} from "../../redux/actions/devPlanActions";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import CustomizedSnackbars from "../shared/snackbars";

import EmployeeDetailsView from "./detailsView";
import EnhancedTableHead from "../shared/enhancedTableHead";
import EnhancedToolbar from "../shared/enhancedToolbar";
import { employeeRows } from "../../common/constants";
import { TEmployee, TAppState, TDevPlan } from "../../common/types";
import {
  findEmployeeById,
  formatDate,
  convertDate,
  isEmployeeAddSuccessful,
  sortEmployeeByName
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
  isDeleteSuccess: boolean;
  searchInput: string;
  isSortByName: boolean;
};

type TProps = {
  employees: TEmployee[];
  devPlans: TDevPlan[];
  loadEmployees: Function;
  loadDevPlans: Function;
  deleteEmployee: Function;
  deleteDevPlanSuccess: Function;
};

type TStyles = {
  secondaryButtonStyle: string;
  closeButtonStyle: string;
};

const styles: TStyles = require("../../styles/employeeStyles.less");

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
    isEditSuccess: false,
    isDeleteSuccess: false,
    searchInput: "",
    isSortByName: false
  };

  componentDidMount() {
    const { devPlans, employees, loadDevPlans, loadEmployees } = this.props;

    if (devPlans.length === 0) {
      loadDevPlans().catch((error: string) => {
        alert("Loading dev plans failed: " + error);
      });
    }

    if (employees.length === 0) {
      loadEmployees().catch((error: string) => {
        alert("Loading employees failed: " + error);
      });
    }

    this.setState({ isAddSuccess: isEmployeeAddSuccessful() });
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
    currData.hireDate = convertDate(currData.hireDate);

    this.setState({ editData: currData, open: true });
  };

  handleClose = (event: React.MouseEvent, button: string) => {
    event.stopPropagation();

    if (button === "close") {
      this.setState({ open: false });
    } else {
      this.setState({ open: false, isEditSuccess: true });
    }
  };

  handleCloseDialog = () => {
    this.setState({ onDelete: false });
  };

  handleClickDelete = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number
  ) => {
    event.stopPropagation();

    this.setState({ onDelete: true, toDelete: id });
  };

  handleDelete = () => {
    const { toDelete } = this.state;
    let i = 0;

    let devPlansAssigned = this.props.devPlans.filter(
      d => d.employeeId === toDelete
    );

    for (i = 0; i < devPlansAssigned.length; i++) {
      this.props.deleteDevPlanSuccess(devPlansAssigned[i].id);
    }

    this.setState({ onDelete: false, isDeleteSuccess: true });
    this.props.deleteEmployee(toDelete);
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
    this.setState({ isEditSuccess: false, isDeleteSuccess: false });
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

  handleSortByName = () => {
    if (this.state.order === "asc") {
      this.setState({ isSortByName: true, order: "desc" });
    } else {
      this.setState({ isSortByName: true, order: "asc" });
    }
  };

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
      isDeleteSuccess,
      page,
      rowsPerPage,
      isSortByName
    } = this.state;

    let tableContent = data;
    {
      isSearch ? (tableContent = data) : (tableContent = this.props.employees);
    }
    {
      isSortByName
        ? (tableContent = sortEmployeeByName(tableContent, order))
        : tableContent;
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
            onClose={this.handleCloseSnackbar.bind(this)}
          />
        )}
        {isEditSuccess && (
          <CustomizedSnackbars
            message="Successfully edited employee"
            variant="success"
            onClose={this.handleCloseSnackbar.bind(this)}
          />
        )}
        {isDeleteSuccess && (
          <CustomizedSnackbars
            message="Successfully deleted employee"
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
                rows={employeeRows}
                sortByProperty={this.handleSortByName.bind(this)}
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
                  <DialogTitle id="alert-dialog-title">
                    {"Delete Employee"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Development plans assigned to this employee will also be
                      deleted. Are you sure you want to delete this employee?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      className={styles.closeButtonStyle}
                      onClick={this.handleCloseDialog}
                    >
                      Cancel
                    </Button>
                    <Button
                      className={styles.secondaryButtonStyle}
                      onClick={this.handleDelete}
                      autoFocus
                    >
                      Delete
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
    employees: state.employees,
    devPlans: state.devPlans
  };
}

const mapDispatchToProps = {
  loadEmployees,
  loadDevPlans,
  deleteEmployee,
  deleteDevPlanSuccess
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeViewPage);
