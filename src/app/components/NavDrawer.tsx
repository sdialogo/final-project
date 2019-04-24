import * as React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { NavLink } from "react-router-dom";

import { styled } from "@material-ui/styles";

type TProps = {
  header: string;
  menuList: any;
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
    this.setState(state => ({ open: !this.state.open }));
  };
  render() {
    const { header, menuList } = this.props;
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
            {header}
          </ToolBar>
        </AppBar>
        <Drawer open={this.state.open} onClose={this.handleToggle}>
          <List subheader={<ListSubheader>Menu</ListSubheader>}>
            <NavLink to="/devplans">
              <ListItem button onClick={this.handleClick}>
                <ListItemText inset primary="Development Plan" />
              </ListItem>
            </NavLink>
            <Divider />
            <NavLink to="/employees">
              <ListItem button onClick={this.handleClick}>
                <ListItemText inset primary="Employee" />
              </ListItem>
            </NavLink>
          </List>
        </Drawer>
        <main>{menuList}</main>
      </div>
    );
  }
}
