import * as React from "react";
import { Status } from "../../common/statusEnum";

import { TextField } from "@material-ui/core";

type TProps = {
  onChange(name: string, event: React.ChangeEvent<HTMLInputElement>): void;
  value: any;
  error: boolean;
  helperText: string;
  isEdit: boolean;
};

export default class StatusDropdown extends React.Component<TProps, {}> {
  render() {
    const { onChange, value, error, helperText, isEdit } = this.props;
    return (
      <TextField
        fullWidth
        select
        id="statusCode"
        variant="outlined"
        label="Status"
        value={value}
        disabled={isEdit}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange("statusCode", event)
        }
        SelectProps={{
          native: true
        }}
        margin="normal"
        error={error}
        helperText={helperText}
      >
        <option value="" />
        <option value={Status.Completed}>{Status.Completed}</option>
        <option value={Status.InProgress}>{Status.InProgress}</option>
        <option value={Status.NotStarted}>{Status.NotStarted}</option>
        ))}
      </TextField>
    );
  }
}
