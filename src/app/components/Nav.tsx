import * as React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";

import { styled } from "@material-ui/styles";

type TProps = {
  header: string;
};

const ToolBar = styled(Toolbar)({
  background: "rgba(73,155,234,1)",
  border: 0,
  color: "white",
  height: 48,
  padding: "0 30px",
  font: "20px solid"
});

export default class NavBar extends React.Component<TProps, {}> {
  state = {
    open: false,
    openList: true
  };

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClick = () => {
    this.setState(state => ({ openList: !this.state.openList }));
  };
  render() {
    return (
      <div>
        <AppBar position="static" color="primary">
          <ToolBar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleToggle}
            >
              <MenuIcon />
            </IconButton>
            {this.props.header}
            <Drawer open={this.state.open} onClose={this.handleToggle}>
              <List subheader={<ListSubheader>Menu</ListSubheader>}>
                <ListItem button onClick={this.handleClick}>
                  <ListItemText inset primary="Development Plan" />
                  {this.state.openList ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.openList} timeout="auto" unmountOnExit>
                  <List>
                    <ListItem button>
                      <ListItemText inset primary="Create" />
                    </ListItem>
                    <ListItem button>
                      <ListItemText inset primary="Update" />
                    </ListItem>
                    <ListItem button>
                      <ListItemText inset primary="Delete" />
                    </ListItem>
                  </List>
                </Collapse>
                <Divider />
                <ListItem button onClick={this.handleClick}>
                  <ListItemText inset primary="Employee" />
                  {this.state.openList ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.openList} timeout="auto" unmountOnExit>
                  <List>
                    <ListItem button>
                      <ListItemText inset primary="Create" />
                    </ListItem>
                    <ListItem button>
                      <ListItemText inset primary="Update" />
                    </ListItem>
                    <ListItem button>
                      <ListItemText inset primary="Delete" />
                    </ListItem>
                  </List>
                </Collapse>
              </List>
            </Drawer>
          </ToolBar>
        </AppBar>
      </div>
    );
  }
}
