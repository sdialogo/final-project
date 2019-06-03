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
  order: any;
  orderBy: string;
  numSelected: number;
  rowCount?: number;
  rows: TRow[];
  sortByProperty(): void;
};

export default class EnhancedTableHead extends React.Component<TProps, {}> {
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
