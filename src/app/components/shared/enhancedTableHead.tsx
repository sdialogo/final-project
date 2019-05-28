import * as React from "react";
import { TRow } from "../../common/types";

import {
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from "@material-ui/core";

type TProps = {
  onSelectAllClick?: Function;
  order: any;
  orderBy: string;
  numSelected: number;
  rowCount?: number;
  onRequestSort: Function;
  rows: TRow[];
  sortByProperty: Function;
};

export default class EnhancedTableHead extends React.Component<TProps, {}> {
  createSortHandler = (property: string) => (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    this.props.onRequestSort(event, property);
  };
  render() {
    const { order, orderBy, rows, sortByProperty } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(
            (row: TRow) => (
              <TableCell
                key={row.id}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip title="Sort" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    // onClick={this.createSortHandler(row.id)}
                    onClick={event => sortByProperty()}
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
