import * as React from "react";

import {
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from "@material-ui/core";

type TProps = {
  onSelectAllClick?: any;
  order: any;
  orderBy: any;
  numSelected: number;
  rowCount?: number;
  onRequestSort: any;
  rows: any;
};

export default class EnhancedTableHead extends React.Component<TProps, {}> {
  createSortHandler = (property: any) => (event: any) => {
    this.props.onRequestSort(event, property);
  };
  render() {
    const { order, orderBy, rows } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(
            (row: any) => (
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
