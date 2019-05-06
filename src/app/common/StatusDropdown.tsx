import * as React from "react";
import { Status } from "./StatusEnum";

import {
  OutlinedInput,
  InputLabel,
  FormControl,
  Select
} from "@material-ui/core";

type TState = {
  status: Status;
};

type TProps = {
  onChange: any;
  value: any;
};

export default class StatusDropdown extends React.Component<TProps, TState> {
  state: TState = {
    status: Status.Blank
  };

  render() {
    const { onChange, value } = this.props;
    return (
      <FormControl variant="outlined">
        <InputLabel ref="age-dropdown" htmlFor="outlined-age-native-simple">
          Status
        </InputLabel>
        <Select
          native
          id="statusCode"
          value={value}
          onChange={onChange("statusCode")}
          input={
            <OutlinedInput
              name="status"
              labelWidth={100}
              id="outlined-age-native-simple"
            />
          }
        >
          <option value="" />
          <option value={Status.Completed}>{Status.Completed}</option>
          <option value={Status.InProgress}>{Status.InProgress}</option>
          <option value={Status.NotStarted}>{Status.NotStarted}</option>
        </Select>
      </FormControl>
    );
  }
}
