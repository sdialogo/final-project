import * as React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Checkbox from "@material-ui/core/Checkbox";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import MoreVertical from "@material-ui/icons/MoreVert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import { styled } from "@material-ui/styles";
import { Status } from "../enums/StatusEnum";

// interface IProps {
//   title: string;
//   assignee: string; //Asignee object
//   progressStatus: Status; //dropdown
//   dueDate: string; //Date
// }

// type TProps = {
//   numSelected: number;
//   onRequestSort: void;
//   onSelectAllClick: void;
//   order: string;
//   orderBy: string;
//   rowCount: number;
// };

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
  selected: [];
  data: TData[];
  page: number;
  rowsPerPage: number;
  open?: boolean;
};

// const ViewDrawer = styled(Drawer)({
//   width: 500,
//   font: "20px solid"
// });

const rowHeaders = [
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

export default class ViewPage extends React.Component<{}, TState> {
  state: TState = {
    order: "asc",
    orderBy: "calories",
    selected: [],
    data: [
      createData("Sample 1", "Asignee 1", Status.Done, "04-18-2019"),
      createData("Sample 2", "Asignee 2", Status.InProgress, "04-19-2019"),
      createData("Sample 3", "Asignee 3", Status.NotStarted, "04-20-2019")
    ],
    page: 0,
    rowsPerPage: 10,
    open: false
  };

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              {rowHeaders.map(rowHeader => (
                <TableCell key={rowHeader.id}>{rowHeader.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(data => (
              <TableRow key={data.id}>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell
                  /*component="th" scope="row" padding="none"*/ align="left"
                >
                  {data.title}
                </TableCell>
                <TableCell align="left">{data.asignee}</TableCell>
                <TableCell align="left">{Status[data.status]}</TableCell>
                <TableCell align="left">{data.dueDate}</TableCell>
                <TableCell align="left">
                  <IconButton onClick={this.handleClickOpen}>
                    <MoreVertical />
                  </IconButton>
                  {/* <Drawer
                    anchor="right"
                    open={this.state.open}
                    onClose={this.handleToggle}
                  >
                    Sample Side Drawer
                  </Drawer> */}
                  <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth={true}
                  >
                    <DialogTitle id="form-dialog-title">
                      {data.title}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Asignee: {data.asignee}
                        <br />
                        Status: {Status[data.status]}
                        <br />
                        Due Date: {data.dueDate}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose} color="primary">
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}
