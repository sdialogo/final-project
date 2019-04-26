import * as React from "react";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { Status } from "../enums/StatusEnum";

type TState = {
  status: Status;
};

export default class StatusDropdown extends React.Component<{}, TState> {
  state: TState = {
    status: Status.Blank
  };

  handleChange = (name: string) => (event: any) => {
    this.setState({ status: event.target.value });
  };

  render() {
    return (
      <FormControl variant="outlined">
        <InputLabel ref="age-dropdown" htmlFor="outlined-age-native-simple">
          Status
        </InputLabel>
        <Select
          native
          value={this.state.status}
          onChange={this.handleChange("status")}
          input={
            <OutlinedInput
              name="age"
              labelWidth={100}
              id="outlined-age-native-simple"
            />
          }
        >
          <option value="" />
          <option value={Status.Done}>{Status.Done}</option>
          <option value={Status.InProgress}>{Status.InProgress}</option>
          <option value={Status.NotStarted}>{Status.NotStarted}</option>
        </Select>
      </FormControl>
    );
  }
}
