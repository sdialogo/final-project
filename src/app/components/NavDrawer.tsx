import * as React from "react";
import { NavLink } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";

import { styled, withStyles } from "@material-ui/styles";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListIcon from "@material-ui/icons/List";
import PersonIcon from "@material-ui/icons/Person";

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
              <MenuIcon />
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
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ primary: classes.primary }}
                    inset
                    primary="Development Plan"
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
                    <PersonIcon />
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
