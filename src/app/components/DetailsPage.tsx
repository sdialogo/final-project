import * as React from "react";
import Drawer from "@material-ui/core/Drawer";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { styled } from "@material-ui/styles";

type TProps = {
  open: boolean;
  data: any;
};

type TState = {
  openState: boolean;
};

const HeaderCard = styled(Card)({
  background: "rgba(73,155,234,1)",
  width: 700,
  color: "white"
});
export default class DetailsPage extends React.Component<TProps, TState> {
  state: TState = {
    openState: true
  };

  handleToggle = () => this.setState({ openState: !this.state.openState });

  handleClose = () => {
    this.setState({ openState: false });
  };
  render() {
    const { open, data } = this.props;
    return (
      <Drawer
        anchor="right"
        open={this.state.openState}
        onClose={this.handleToggle}
        // variant="persistent"
      >
        <HeaderCard>
          <CardContent>
            <Typography>
              <h3 style={{ color: "white" }}>{data.title}</h3>
            </Typography>
            <div>
              <Typography variant="caption" style={{ display: "inline-block" }}>
                Asignee
              </Typography>
              <Typography
                variant="button"
                style={{
                  display: "inline-block",
                  color: "white",
                  marginLeft: "10px"
                }}
              >
                {data.asignee}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" style={{ display: "inline-block" }}>
                Status
              </Typography>
              <Typography
                variant="button"
                style={{
                  display: "inline-block",
                  color: "white",
                  marginLeft: "10px"
                }}
              >
                {data.status}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" style={{ display: "inline-block" }}>
                Due Date
              </Typography>
              <Typography
                variant="button"
                style={{
                  display: "inline-block",
                  color: "white",
                  marginLeft: "10px"
                }}
              >
                {data.dueDate}
              </Typography>
            </div>
          </CardContent>
        </HeaderCard>
        <Card>
          <CardActions>
            <Button size="medium" onClick={this.handleClose}>
              Close
            </Button>
          </CardActions>
        </Card>
      </Drawer>
    );
  }
}
