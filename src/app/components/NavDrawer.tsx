import * as React from "react";
import { NavLink } from "react-router-dom";
import { styled, withStyles } from "@material-ui/styles";

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

const ToolBar = styled(Toolbar)({
  background: "rgba(73,155,234,1)",
  border: 0,
  color: "white",
  height: 48,
  padding: "0 30px",
  font: "20px solid"
});

const styles = () => ({
  menuItem: {
    "&:focus": {
      background: "red",
      "& $primary, & $icon": {
        color: "rgba(73,155,234,1)"
      }
    }
  },
  primary: {},
  icon: {}
});

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
    const { header, menuList, classes } = this.props;
    return (
      <div>
        <AppBar position="static" color="primary">
          <ToolBar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleToggle}
            >
              <Menu />
            </IconButton>
            {header}
          </ToolBar>
        </AppBar>
        <Drawer open={this.state.open} onClose={this.handleToggle}>
          <Paper>
            <MenuList>
              <NavLink to="/devplans" style={{ textDecoration: "none" }}>
                <MenuItem
                  className={classes.menuItem}
                  onClick={this.handleClick}
                >
                  <ListItemIcon className={classes.icon}>
                    <List />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ primary: classes.primary }}
                    inset
                    primary="Development Plan"
                    style={{ width: 200 }}
                  />
                </MenuItem>
              </NavLink>
              <Divider />
              <NavLink to="/employees" style={{ textDecoration: "none" }}>
                <MenuItem
                  className={classes.menuItem}
                  onClick={this.handleClick}
                >
                  <ListItemIcon className={classes.icon}>
                    <Person />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ primary: classes.primary }}
                    inset
                    primary="Employee"
                  />
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

export default withStyles(styles)(NavBar);
