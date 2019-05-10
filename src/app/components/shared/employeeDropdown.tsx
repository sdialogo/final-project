import * as React from "react";
import { TEmployee } from "../../common/types";

import { TextField } from "@material-ui/core";

type TProps = {
  employees: TEmployee[];
  onChange: any;
  value: any;
  error?: boolean;
  helperText?: string;
};

export default class EmployeeDropdown extends React.Component<TProps, {}> {
  render() {
    const { onChange, value, employees, error, helperText } = this.props;
    return (
      <TextField
        fullWidth
        select
        id="employeeId"
        variant="outlined"
        label="Assignee"
        value={value}
        onChange={onChange("employeeId")}
        SelectProps={{
          native: true
        }}
        margin="normal"
        error={error}
        helperText={helperText}
      >
        <option key="blank" value="" />
        {employees.map(employee => (
          <option key={employee.id} value={employee.id}>
            {employee.fullName}
          </option>
        ))}
      </TextField>
    );
  }
}
