import * as React from "react";

import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import { Table, Paper, TableBody, IconButton } from "@material-ui/core";
import MoreVertical from "@material-ui/icons/MoreVert";

type TEmployee = {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  archived: boolean;
  hireDate: string;
};

type TProps = {
  onSelectAllClick: any;
  order: any;
  orderBy: any;
  numSelected: number;
  rowCount: number;
  onRequestSort: any;
  data?: TEmployee[];
  handleSelectAllClick?: any;
  handleRequestSort?: any;
  handleDrawerOpen?: any;
  handleClickDelete?: any;
  selected?: any;
};

type TState = {
  selected: any;
};

const rows = [
  { id: "id", disablePadding: true, label: "ID" },
  { id: "firstName", disablePadding: false, label: "First Name" },
  { id: "middleName", disablePadding: false, label: "Middle Name" },
  { id: "lastName", disablePadding: false, label: "Last Name" },
  { id: "archived", disablePadding: false, label: "Archived" },
  { id: "hireDate", disablePadding: false, label: "Hire Date" },
  { id: "action", disablePadding: false, label: "Actions" }
];

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

export default class EmployeeEnhancedTable extends React.Component<
  TProps,
  TState
> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      selected: this.props.selected
    };
  }

  isSelected = (id: number) => this.state.selected.indexOf(id) !== -1;

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      data,
      handleDrawerOpen,
      handleClickDelete,
      onRequestSort
    } = this.props;
    return (
      <div>
        <Paper>
          <div>
            <Table aria-labelledby="tableTitle">
              <EmployeeEnhancedTable
                numSelected={numSelected}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={onSelectAllClick}
                onRequestSort={onRequestSort}
                rowCount={rowCount}
              />
              <TableBody>
                {data.map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => handleDrawerOpen(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          // onChange={event => this.handleClick(event, n.id)}
                        />
                      </TableCell>
                      <TableCell padding="none">{n.id}</TableCell>
                      <TableCell align="left">{n.lastName}</TableCell>
                      <TableCell align="left">{n.firstName}</TableCell>
                      <TableCell align="left">{n.middleName}</TableCell>
                      <TableCell align="left">{n.archived}</TableCell>
                      <TableCell align="left">{n.hireDate}</TableCell>
                      <TableCell align="left">
                        <IconButton
                          onClick={event => handleClickDelete(event, n.id)}
                        >
                          <MoreVertical />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Paper>
      </div>
    );
  }
}
