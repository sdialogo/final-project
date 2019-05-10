import * as React from "react";
import { connect } from "react-redux";
import { getFullName } from "../../common/functions";
import { TEmployee } from "../../common/types";
import {
  addEmployee,
  deleteEmployee
} from "../../redux/actions/employeeActions";

import {
  CardActions,
  Button,
  Grid,
  TextField,
  Divider,
  MenuItem
} from "@material-ui/core";

type TProps = {
  data: TEmployee;
  isEdit: boolean;
  closeDrawer: Function;
  tabValue: number;
  addEmployee: Function;
  deleteEmployee: Function;
};

type TState = {
  data: TEmployee;
  isFirstNameError: boolean;
  isMiddleNameError: boolean;
  isLastNameError: boolean;
  isHireDateError: boolean;
  isArchivedError: boolean;
  firstNameError: string;
  middleNameError: string;
  lastNameError: string;
  hireDateError: string;
  archivedError: string;
};

let schema = {
  properties: {
    firstName: {
      type: "string",
      minLength: 1
    },
    middleName: {
      type: "string",
      minLength: 1
    },
    lastName: {
      type: "string",
      minLength: 1
    },
    hireDate: {
      type: "string",
      minLength: 1
    },
    archived: {
      type: "string"
    }
  },
  required: ["firstName", "middleName", "lastName", "hireDate", "archived"]
};

const options = [
  {
    value: "Yes",
    label: "Yes"
  },
  {
    value: "No",
    label: "No"
  }
];

type TStyles = {
  gridContainer: string;
  textField: string;
  buttonStyle: string;
};

const styles: TStyles = require("../../styles/employeeStyles.less");

class EmployeeSubViewPage extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      data: this.props.data,
      isFirstNameError: false,
      isMiddleNameError: false,
      isLastNameError: false,
      isHireDateError: false,
      isArchivedError: false,
      firstNameError: "",
      middleNameError: "",
      lastNameError: "",
      hireDateError: "",
      archivedError: ""
    };
  }

  validate = (data: TEmployee) => {
    var Ajv = require("ajv");
    var ajv = Ajv({ allErrors: true });
    var valid = ajv.validate(schema, data);
    let isValid;
    if (valid) {
      isValid = true;
    } else {
      isValid = false;
      console.log(ajv.errors);
      ajv.errors.map((error: any) => {
        if (error.dataPath === ".firstName") {
          this.setState({
            isFirstNameError: true,
            firstNameError: "First Name is required"
          });
        }
        if (error.dataPath === ".middleName") {
          this.setState({
            isMiddleNameError: true,
            middleNameError: "Middle Name is required"
          });
        }
        if (error.dataPath === ".lastName") {
          this.setState({
            isLastNameError: true,
            lastNameError: "Last Name is required"
          });
        }
        if (error.dataPath === ".hireDate") {
          this.setState({
            isHireDateError: true,
            hireDateError: "Hire Date is required"
          });
        }
        if (error.dataPath === ".archived") {
          this.setState({
            isArchivedError: true,
            archivedError: "Archived is required"
          });
        }
      });
    }

    return isValid;
  };

  handleSave = () => {
    event.preventDefault();
    const isValid = this.validate(this.state.data);

    if (isValid) {
      console.log("Edit...");
      //update app state; delete then add
      this.props.deleteEmployee(this.state.data.id);
      this.props.addEmployee(this.state.data);

      this.props.closeDrawer(event);
    }
  };

  handleChange = (name: string) => (event: any) => {
    let employee = { ...this.state.data, [name]: event.target.value };
    let fullName = getFullName(employee);
    employee.fullName = fullName;

    if (name === "firstName") {
      this.setState({ isFirstNameError: false });
    } else if (name === "middleName") {
      this.setState({ isMiddleNameError: false });
    } else if (name === "lastName") {
      this.setState({ isLastNameError: false });
    } else if (name === "hireDate") {
      this.setState({ isHireDateError: false });
    } else if (name === "archived") {
      this.setState({ isArchivedError: false });
    }

    this.setState({ data: employee });
  };
  render() {
    const { isEdit, closeDrawer, tabValue } = this.props;
    const {
      data,
      isFirstNameError,
      isLastNameError,
      isMiddleNameError,
      isHireDateError,
      isArchivedError,
      firstNameError,
      middleNameError,
      lastNameError,
      hireDateError,
      archivedError
    } = this.state;
    return (
      <div>
        <form noValidate autoComplete="off">
          <Grid container spacing={16} className={styles.gridContainer}>
            <Grid item xs={6}>
              <TextField
                className={styles.textField}
                id="firstName"
                label="First Name"
                value={data.firstName}
                onChange={this.handleChange("firstName")}
                margin="normal"
                variant="outlined"
                disabled={!isEdit}
                error={isFirstNameError}
                helperText={isFirstNameError ? firstNameError : ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={styles.textField}
                id="lastName"
                label="Last Name"
                value={data.lastName}
                onChange={this.handleChange("lastName")}
                margin="normal"
                variant="outlined"
                disabled={!isEdit}
                error={isLastNameError}
                helperText={isLastNameError ? lastNameError : ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={styles.textField}
                id="middleName"
                label="Middle Name"
                value={data.middleName}
                onChange={this.handleChange("middleName")}
                margin="normal"
                variant="outlined"
                disabled={!isEdit}
                error={isMiddleNameError}
                helperText={isMiddleNameError ? middleNameError : ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={styles.textField}
                id="hireDate"
                label="Hire Date"
                type="date"
                value={data.hireDate}
                onChange={this.handleChange("hireDate")}
                margin="normal"
                variant="outlined"
                disabled={!isEdit}
                error={isHireDateError}
                helperText={isHireDateError ? hireDateError : ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={styles.textField}
                id="archived"
                select
                label="Archived"
                value={data.archived}
                onChange={this.handleChange("archived")}
                margin="normal"
                variant="outlined"
                disabled={!isEdit}
                error={isArchivedError}
                helperText={isArchivedError ? archivedError : ""}
              >
                {options.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </form>
        <Divider />
        <CardActions>
          {tabValue === 1 ? (
            <Grid spacing={8} justify="flex-end" container>
              <Grid item>
                <Button
                  className={styles.buttonStyle}
                  onClick={this.handleSave}
                >
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={styles.buttonStyle}
                  onClick={event => closeDrawer(event)}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid spacing={8} justify="flex-end" container>
              <Grid item>
                <Button
                  className={styles.buttonStyle}
                  onClick={event => closeDrawer(event)}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          )}
        </CardActions>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    employees: state.employees
  };
}

const mapDispatchToProps = {
  addEmployee,
  deleteEmployee
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeSubViewPage);
