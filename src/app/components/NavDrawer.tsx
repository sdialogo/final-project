import * as React from "react";
import { NavLink } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Drawer,
  ListItemText,
  Divider,
  MenuList,
  MenuItem,
  Paper,
  IconButton,
  ListItemIcon
} from "@material-ui/core";

import { Menu, List, Person } from "@material-ui/icons";

type TProps = {
  header: string;
  menuList: any;
  classes?: any;
};

type TStyles = {
  menuItems: string;
  listItems: string;
  toolbar: string;
};

const styles: TStyles = require("../styles/styles.less");

class NavBar extends React.Component<TProps, {}> {
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
          <Toolbar className={styles.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleToggle}
            >
              <Menu />
            </IconButton>
            {header}
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.open} onClose={this.handleToggle}>
          <Paper>
            <MenuList>
              <NavLink to="/devplans" className={styles.menuItems}>
                <MenuItem onClick={this.handleClick}>
                  <ListItemIcon>
                    <List />
                  </ListItemIcon>
                  <ListItemText inset primary="Development Plan" />
                </MenuItem>
              </NavLink>
              <Divider />
              <NavLink to="/employees" className={styles.menuItems}>
                <MenuItem onClick={this.handleClick}>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText inset primary="Employee" />
                </MenuItem>
              </NavLink>
            </MenuList>
          </Paper>
        </Drawer>
        <main>{menuList}</main>
      </div>
    );
  }
}

export default NavBar;
