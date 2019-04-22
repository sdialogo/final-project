import * as React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Checkbox from "@material-ui/core/Checkbox";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Chip from "@material-ui/core/Chip";
import MoreVertical from "@material-ui/icons/MoreVert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Toolbar from "@material-ui/core/Toolbar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import { styled } from "@material-ui/styles";
import { Status } from "../enums/StatusEnum";
import { Divider } from "@material-ui/core";
import color from "@material-ui/core/colors/blue";
import { any } from "prop-types";

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
};

type TProps = {
  onSelectAllClick?: any;
  numSelected?: number;
  rowCount?: number;
};

const HeaderCard = styled(Card)({
  background: "rgba(73,155,234,1)",
  width: 700,
  color: "white"
});

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

export default class ViewPage extends React.Component<TProps, TState> {
  state: TState = {
    order: "asc",
    orderBy: "dueDate",
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

  handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event: any, id: number) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

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

  render() {
    const { onSelectAllClick } = this.props;
    const { numSelected } = this.props;
    const { rowCount } = this.props;

    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                // indeterminate={numSelected > 0 && numSelected < rowCount}
                // checked={numSelected === rowCount}
                // onChange={onSelectAllClick}
                />
              </TableCell>
              {rowHeaders.map(rowHeader => (
                <TableCell key={rowHeader.id}>{rowHeader.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(data => (
              <TableRow key={data.id}>
                {/* handleClick */}
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell align="left">{data.title}</TableCell>
                <TableCell align="left">{data.asignee}</TableCell>
                <TableCell align="left">{data.status}</TableCell>
                <TableCell align="left">{data.dueDate}</TableCell>
                <TableCell align="left">
                  <IconButton onClick={this.handleClickOpen}>
                    <MoreVertical />
                  </IconButton>
                  <Drawer
                    anchor="right"
                    open={this.state.open}
                    onClose={this.handleToggle}
                    // variant="persistent"
                  >
                    <HeaderCard>
                      <CardContent>
                        <Typography>
                          <h3 style={{ color: "white" }}>{data.title}</h3>
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
                            {data.asignee}
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
                            {data.status}
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
                            {data.dueDate}
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
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}
