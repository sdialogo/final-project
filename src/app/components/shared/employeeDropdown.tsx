import * as React from "react";
import { TEmployee } from "../../common/types";

import { TextField } from "@material-ui/core";

type TProps = {
  employees: TEmployee[];
  onChange(name: string, event: React.ChangeEvent<HTMLInputElement>): void;
  value: number;
  error: boolean;
  helperText: string;
  isEdit: boolean;
};

export default class EmployeeDropdown extends React.Component<TProps, {}> {
  render() {
    const {
      onChange,
      value,
      employees,
      error,
      helperText,
      isEdit
    } = this.props;
    return (
      <TextField
        fullWidth
        select
        id="employeeId"
        variant="outlined"
        label="Assignee"
        value={value}
        disabled={isEdit}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange("employeeId", event)
        }
        margin="normal"
        error={error}
        helperText={helperText}
        SelectProps={{
          native: true
        }}
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
