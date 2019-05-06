import * as React from "react";
import { TEmployee } from "./types";

import { TextField } from "@material-ui/core";

type TProps = {
  employees: TEmployee[];
  onChange: any;
  value: any;
};

export default class StatusDropdown extends React.Component<TProps, {}> {
  render() {
    const { onChange, value, employees } = this.props;
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
      >
        <option key="blank" value="" />
        {employees.map(employee => (
          <option key={employee.id} value={employee.fullName}>
            {employee.fullName}
          </option>
        ))}
      </TextField>
    );
  }
}
