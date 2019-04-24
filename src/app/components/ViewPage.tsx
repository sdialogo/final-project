import * as React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import Drawer from "@material-ui/core/Drawer";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import IconButton from "@material-ui/core/IconButton";
import MoreVertical from "@material-ui/icons/MoreVert";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

import { styled } from "@material-ui/styles";
import { Status } from "../enums/StatusEnum";
import { any } from "prop-types";
import DetailsView from "./DetailsView";

type TData = {
  id: number;
  title: string;
  asignee: string;
  status: Status;
  dueDate: string;
};

type TState = {
  order: string;
  orderBy: string;
  selected: number[];
  data: TData[];
  page: number;
  rowsPerPage: number;
  open?: boolean;
  isCheckbox?: boolean;
  editData: TData;
};

type TProps = {
  onSelectAllClick: any;
  order: any;
  orderBy: any;
  numSelected: number;
  rowCount: number;
  onRequestSort: any;
};

const rows = [
  { id: "title", disablePadding: true, label: "Title" },
  { id: "assignee", disablePadding: false, label: "Assignee" },
  { id: "status", disablePadding: false, label: "Progress Status" },
  { id: "dueDate", disablePadding: false, label: "Due Date" },
  { id: "action", disablePadding: false, label: "Actions" }
];

let counter = 0;
function createData(
  title: string,
  asignee: string,
  status: Status,
  dueDate: string
) {
  counter += 1;
  return { id: counter, title, asignee, status, dueDate };
}

const HeaderCard = styled(Card)({
  background: "rgba(73,155,234,1)",
  width: 700,
  color: "white"
});

class EnhancedTableHead extends React.Component<TProps, {}> {
  createSortHandler = (property: any) => (event: any) => {
    this.props.onRequestSort(event, property);
  };
  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip title="Sort" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

export default class ViewPage extends React.Component<{}, TState> {
  state: TState = {
    order: "asc",
    orderBy: "asignee",
    selected: [],
    data: [
      createData("Sample 1", "Asignee 1", Status.Done, "04-18-2019"),
      createData("Sample 2", "Asignee 2", Status.InProgress, "04-19-2019"),
      createData("Sample 3", "Asignee 3", Status.NotStarted, "04-20-2019"),
      createData("Sample 4", "Asignee 4", Status.Done, "04-20-2019")
    ],
    page: 0,
    rowsPerPage: 10,
    isCheckbox: true,
    editData: {
      id: 0,
      title: "",
      asignee: "",
      status: Status.Done,
      dueDate: ""
    }
  };

  handleRequestSort = (event: any, property: any) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event: any, id: number) => {
    const { selected, isCheckbox } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected: any[] = [];

    if (!isCheckbox) {
      this.setState({ isCheckbox: true });
      return;
    }

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  isSelected = (id: number) => this.state.selected.indexOf(id) !== -1;

  handleToggle = () => this.setState({ open: !this.state.open });

  handleDrawerOpen = (event: any, id: number) => {
    event.stopPropagation();
    console.log("Drawer opened");
    const { data } = this.state;
    let currData = data[id - 1];

    this.setState({ editData: currData, open: true, isCheckbox: false });
  };

  handleDelete = (event: any, id: number) => {
    console.log("Delete...");
    event.stopPropagation();
  };

  handleClose = (event: any) => {
    event.stopPropagation();
    console.log("Closing drawer...");
    this.setState({ open: false });
  };

  render() {
    const {
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      editData
    } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <Paper>
        {/* Enhanced Toolbar */}
        <div>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data.map(n => {
                const isSelected = this.isSelected(n.id);
                const currStatus = editData.status;
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleDrawerOpen(event, n.id)}
                    // role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} />
                    </TableCell>
                    <TableCell padding="none">{n.title}</TableCell>
                    <TableCell align="left">{n.asignee}</TableCell>
                    <TableCell align="left">{n.status}</TableCell>
                    <TableCell align="left">{n.dueDate}</TableCell>
                    <TableCell align="left">
                      <IconButton
                        onClick={event => this.handleDelete(event, n.id)}
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
            <DetailsView
              data={editData}
              toggleDrawer={this.handleToggle.bind(this)}
              closeDrawer={this.handleClose.bind(this)}
            />
          ) : (
            <div />
          )}
        </div>
      </Paper>
    );
  }
}
