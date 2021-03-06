import * as React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import EnhancedToolbar from "../shared/enhancedToolbar";
import DetailsView from "./detailsView";
import EnhancedTableHead from "../shared/enhancedTableHead";
import CustomizedSnackbars from "../shared/snackbars";
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
import { DeleteTwoTone } from "@material-ui/icons";
import {
  findDataById,
  formatDate,
  convertDate,
  sortDevPlanTableContentById,
  isDevPlanAddSuccessful,
  sortDevPlanByTitle
} from "../../common/functions";
import { devPlanRows } from "../../common/constants";
import {
  loadDevPlans,
  deleteDevPlan
} from "../../redux/actions/devPlanActions";
import { loadEmployees } from "../../redux/actions/employeeActions";

import { TDevPlan, TEmployee, TAppState } from "../../common/types";

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
  toDelete: number;
  redirectToAddPage: boolean;
  isSearch: boolean;
  isAddSuccess: boolean;
  isEditSuccess: boolean;
  isDeleteSuccess: boolean;
  searchInput: string;
  isSortByTitle: boolean;
};

type TProps = {
  devPlans: TDevPlan[];
  employees: TEmployee[];
  loadDevPlans: Function;
  loadEmployees: Function;
  deleteDevPlan: Function;
};

type TStyles = {
  redButton: string;
  greenButton: string;
  yellowButton: string;
  secondaryButtonStyle: string;
  closeButtonStyle: string;
};

const styles: TStyles = require("../../styles/devPlanStyles.less");

class DevPlanviewPage extends React.Component<TProps, TState> {
  state: TState = {
    data: this.props.devPlans,
    order: "asc",
    orderBy: "title",
    selected: [],
    page: 0,
    rowsPerPage: 5,
    open: null,
    ediTDevPlan: {
      id: null,
      title: "",
      description: "",
      employeeId: null,
      employeeName: "",
      statusCode: "",
      dueDate: ""
    },
    onDelete: false,
    toDelete: null,
    redirectToAddPage: false,
    isSearch: false,
    isAddSuccess: false,
    isEditSuccess: false,
    isDeleteSuccess: false,
    searchInput: "",
    isSortByTitle: false
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

    this.setState({ isAddSuccess: isDevPlanAddSuccessful() });
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
    let currData = findDataById(id, this.props.devPlans);
    currData.dueDate = convertDate(currData.dueDate);

    this.setState({ ediTDevPlan: currData, open: true });
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
    this.setState({ onDelete: false, isDeleteSuccess: true });
    this.props.deleteDevPlan(this.state.toDelete);
  };

  handleRedirectToAddPage = () => {
    this.setState({ redirectToAddPage: true });
  };

  handleDataFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredData = this.state.data.filter(d =>
      d.title.includes(event.target.value)
    );

    this.setState({
      data: filteredData,
      isSearch: true,
      searchInput: event.target.value
    });
  };

  handleClearSearch = () => {
    this.setState({
      data: this.props.devPlans,
      isSearch: false,
      searchInput: ""
    });
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

  handleSortByTitle = () => {
    if (this.state.order === "asc") {
      this.setState({ isSortByTitle: true, order: "desc" });
    } else {
      this.setState({ isSortByTitle: true, order: "asc" });
    }
  };

  render() {
    const {
      data,
      order,
      orderBy,
      selected,
      ediTDevPlan,
      isSearch,
      isAddSuccess,
      isEditSuccess,
      isDeleteSuccess,
      rowsPerPage,
      page,
      isSortByTitle
    } = this.state;

    let tableContent = data;
    {
      isSearch
        ? (tableContent = sortDevPlanTableContentById(data))
        : (tableContent = sortDevPlanTableContentById(this.props.devPlans));
    }

    {
      isSortByTitle
        ? (tableContent = sortDevPlanByTitle(tableContent, order))
        : tableContent;
    }
    return (
      <div>
        <EnhancedToolbar
          title="Development Plan"
          redirectToAddPage={this.handleRedirectToAddPage}
          dataFilter={this.handleDataFilter}
          clearSearch={this.handleClearSearch}
        />
        {this.state.redirectToAddPage && <Redirect to="/addDevPlan" />}
        {isAddSuccess && (
          <CustomizedSnackbars
            message="Successfully added new development plan"
            variant="success"
            onClose={this.handleCloseSnackbar.bind(this)}
          />
        )}
        {isEditSuccess && (
          <CustomizedSnackbars
            message="Successfully edited development plan"
            variant="success"
            onClose={this.handleCloseSnackbar.bind(this)}
          />
        )}
        {isDeleteSuccess && (
          <CustomizedSnackbars
            message="Successfully deleted development plan"
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
                rows={devPlanRows}
                sortByProperty={this.handleSortByTitle.bind(this)}
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
                        <TableCell align="left">{n.title}</TableCell>
                        <TableCell align="left">{n.employeeName}</TableCell>
                        <TableCell align="left">
                          <div
                            className={
                              n.statusCode == "Completed"
                                ? styles.greenButton
                                : n.statusCode == "Not Started"
                                ? styles.redButton
                                : styles.yellowButton
                            }
                          >
                            {n.statusCode}
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          {formatDate(n.dueDate)}
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
                  <DialogTitle id="alert-dialog-title">
                    {"Delete Development Plan"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to delete this development plan?
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
    devPlans:
      state.employees.length === 0
        ? []
        : state.devPlans.map((devPlan: TDevPlan) => {
            return {
              ...devPlan,
              employeeName: state.employees.find(
                (a: TEmployee) => a.id === devPlan.employeeId
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
