import * as React from "react";
import PropTypes, { any } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import MoreVertical from "@material-ui/icons/MoreVert";
import Drawer from "@material-ui/core/Drawer";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import { styled } from "@material-ui/styles";
import { Status } from "../enums/StatusEnum";

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
      createData("Sample 4", "Asignee 4", Status.NotStarted, "04-20-2019")
    ],
    page: 0,
    rowsPerPage: 10,
    isCheckbox: true
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

    console.log("id: ", id);
    console.log("selected index: ", selectedIndex);
    console.log("selected: ", selected);
    console.log("checkbox?: ", isCheckbox);

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

  handleDrawerOpen = () => {
    this.setState({ open: true });
    this.setState({ isCheckbox: false });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
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
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n.id)}
                    role="checkbox"
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
                      <IconButton onClick={this.handleDrawerOpen}>
                        <MoreVertical />
                      </IconButton>
                      <Drawer
                        anchor="right"
                        open={this.state.open}
                        onClose={this.handleToggle}
                      >
                        <HeaderCard>
                          <CardContent>
                            <Typography>
                              <h3 style={{ color: "white" }}>{n.title}</h3>
                            </Typography>
                            <div>
                              <Typography
                                variant="caption"
                                style={{ display: "inline-block" }}
                              >
                                Asignee
                              </Typography>
                              <Typography
                                variant="button"
                                style={{
                                  display: "inline-block",
                                  color: "white",
                                  marginLeft: "10px"
                                }}
                              >
                                {n.asignee}
                              </Typography>
                            </div>
                            <div>
                              <Typography
                                variant="caption"
                                style={{ display: "inline-block" }}
                              >
                                Status
                              </Typography>
                              <Typography
                                variant="button"
                                style={{
                                  display: "inline-block",
                                  color: "white",
                                  marginLeft: "10px"
                                }}
                              >
                                {n.status}
                              </Typography>
                            </div>
                            <div>
                              <Typography
                                variant="caption"
                                style={{ display: "inline-block" }}
                              >
                                Due Date
                              </Typography>
                              <Typography
                                variant="button"
                                style={{
                                  display: "inline-block",
                                  color: "white",
                                  marginLeft: "10px"
                                }}
                              >
                                {n.dueDate}
                              </Typography>
                            </div>
                          </CardContent>
                        </HeaderCard>
                        <Card>
                          <CardActions>
                            <Button size="medium" onClick={this.handleClose}>
                              Close
                            </Button>
                          </CardActions>
                        </Card>
                      </Drawer>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    );
  }
}
