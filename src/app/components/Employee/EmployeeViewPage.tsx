import * as React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import IconButton from "@material-ui/core/IconButton";
import MoreVertical from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";

import { Status } from "../../enums/StatusEnum";
// import DetailsView from "./DetailsView";
import EnhancedTableHead from "../DevPlan/EnhancedTableHead";

type TEmployee = {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  archived: boolean;
  hireDate: string;
};

type TState = {
  order: string;
  orderBy: string;
  selected: number[];
  data: TEmployee[];
  page: number;
  rowsPerPage: number;
  open: boolean;
  editData: TEmployee;
  onDelete: boolean;
  toDelete: number;
  redirectToAddPage: boolean;
};

let counter = 0;

function createData(
  firstName: string,
  lastName: string,
  middleName: string,
  archived: boolean,
  hireDate: string
) {
  counter += 1;
  return { id: counter, firstName, lastName, middleName, archived, hireDate };
}

function findDataById(id: number, arr: TEmployee[]): TEmployee {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return arr[i];
    }
  }

  return {
    id: 0,
    firstName: "",
    lastName: "",
    middleName: "",
    archived: false,
    hireDate: ""
  };
}

export default class EmployeeViewPage extends React.Component<{}, TState> {
  state: TState = {
    order: "asc",
    orderBy: "lastname",
    selected: [],
    data: [
      createData("Yuri", "Jo", "Jogoori", false, "04-01-2019"),
      createData("Yena", "Choi", "Duck", false, "04-01-2019")
    ],
    page: 0,
    rowsPerPage: 10,
    open: null,
    editData: {
      id: 0,
      firstName: "",
      lastName: "",
      middleName: "",
      archived: false,
      hireDate: ""
    },
    onDelete: false,
    toDelete: 0,
    redirectToAddPage: false
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
    console.log("Row " + id + " checkbox");
    event.stopPropagation();
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected: any[] = [];

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
    let currData = findDataById(id, data);

    this.setState({ editData: currData, open: true });
  };

  handleClose = (event: any) => {
    event.stopPropagation();
    console.log("Closing drawer...");
    this.setState({ open: false });
  };

  handleCloseDialog = () => {
    console.log("Delete cancelled");
    this.setState({ onDelete: false });
  };

  handleClickDelete = (event: any, id: number) => {
    console.log("Deleting data...");
    event.stopPropagation();

    this.setState({ onDelete: true, toDelete: id });
  };

  handleDelete = () => {
    const { data, toDelete } = this.state;
    let deleteData: TEmployee = findDataById(toDelete, data);

    this.setState({
      onDelete: false,
      data: data.filter(d => d !== deleteData)
    });
    console.log("Deleted");
  };

  handleRedirectToAddPage = () => {
    this.setState({ redirectToAddPage: true });
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
    return <div>sdfasd</div>;
  }
}
