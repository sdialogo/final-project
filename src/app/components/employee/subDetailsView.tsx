import * as React from "react";
import { connect } from "react-redux";
import { getFullName } from "../../common/functions";
import { TEmployee, TEmployeeError, TAppState } from "../../common/types";
import { validateEmployee } from "../../common/functions";
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
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup
} from "@material-ui/core";

type TState = {
  data: TEmployee;
  errors: TEmployeeError;
};

type TProps = {
  data: TEmployee;
  isEdit: boolean;
  closeDrawer: Function;
  tabValue: number;
  addEmployee: Function;
  deleteEmployee: Function;
};

type TStyles = {
  gridContainer: string;
  textField: string;
  buttonStyle: string;
  radioButton: string;
};

const styles: TStyles = require("../../styles/employeeStyles.less");

class EmployeeSubViewPage extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      data: this.props.data,
      errors: [
        { isFirstNameError: false, firstNameError: "" },
        { isMiddleNameError: false, middleNameError: "" },
        { isLastNameError: false, lastNameError: "" },
        { isHireDateError: false, hireDateError: "" },
        { isArchivedError: false, archivedError: "" }
      ]
    };
  }

  handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let employee = { ...this.state.data, [name]: event.target.value };
    let errorsCopy = this.state.errors;

    let fullName = getFullName(employee);
    employee.fullName = fullName;

    if (name === "firstName") {
      errorsCopy[0].isFirstNameError = false;
      errorsCopy[0].firstNameError = "";
    } else if (name === "middleName") {
      errorsCopy[1].isMiddleNameError = false;
      errorsCopy[1].middleNameError = "";
    } else if (name === "lastName") {
      errorsCopy[2].isLastNameError = false;
      errorsCopy[2].lastNameError = "";
    } else if (name === "hireDate") {
      errorsCopy[3].isHireDateError = false;
      errorsCopy[3].hireDateError = "";
    } else if (name === "archived") {
      errorsCopy[4].isArchivedError = false;
      errorsCopy[4].archivedError = "";
    }

    this.setState({ data: employee, errors: errorsCopy });
  };

  handleSave = () => {
    event.preventDefault();
    let returnObj = validateEmployee(this.state.data);

    if (returnObj.isValid) {
      console.log("Edit...");

      this.props.deleteEmployee(this.state.data.id);
      this.props.addEmployee(this.state.data);

      this.props.closeDrawer(event);
    } else {
      this.setState({ errors: returnObj.errorList });
    }
  };
  render() {
    const { isEdit, closeDrawer, tabValue } = this.props;
    const { data, errors } = this.state;
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
                error={errors[0].isFirstNameError}
                helperText={
                  errors[0].isFirstNameError ? errors[0].firstNameError : ""
                }
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
                error={errors[2].isLastNameError}
                helperText={
                  errors[2].isLastNameError ? errors[2].lastNameError : ""
                }
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
                error={errors[1].isMiddleNameError}
                helperText={
                  errors[1].isMiddleNameError ? errors[1].isMiddleNameError : ""
                }
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
                error={errors[3].isHireDateError}
                helperText={
                  errors[3].isHireDateError ? errors[3].hireDateError : ""
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormLabel>Archived</FormLabel>
              <RadioGroup
                aria-label="Archived"
                name="archived"
                value={String(data.archived)}
                onChange={this.handleChange("archived")}
                className={styles.radioButton}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                  disabled={!isEdit}
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                  disabled={!isEdit}
                />
              </RadioGroup>
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
                  onClick={event => closeDrawer(event, "close")}
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
                  onClick={event => closeDrawer(event, "close")}
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

function mapStateToProps(state: TAppState) {
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
