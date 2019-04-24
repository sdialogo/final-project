import * as React from "react";
import Drawer from "@material-ui/core/Drawer";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { styled } from "@material-ui/styles";

type TState = {
  open: boolean;
};

type TProps = {
  data: string;
};

export default class DetailsView extends React.Component<TProps, TState> {
  state: TState = {
    open: true
  };

  handleToggle = () => this.setState({ open: !this.state.open });

  render() {
    const { data } = this.props;
    console.log("data: ", data);

    return (
      <Drawer anchor="right" open={this.state.open} onClose={this.handleToggle}>
        {data}
      </Drawer>
    );
  }
}
