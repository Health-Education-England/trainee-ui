import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "./../../static/images/hee-nhs-logo-white.svg";
import { Typography, Avatar, Button, Tabs, Tab } from "@material-ui/core";
import AccountSettingsPopupMenu from "../common/AccountSettingsPopupMenu";
import { Link, Route } from "react-router-dom";

interface NavbarProps {}
interface NavbarState {
  anchorEl: any;
}

class NavbarComponent extends React.PureComponent<NavbarProps, NavbarState> {
  constructor(props: any) {
    super(props);

    this.state = { anchorEl: null };
  }

  handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    return (
      <AppBar position="relative">
        <Toolbar>
          <div className="header-logo">
            <img src={logo} alt="HEE-NHS" />
          </div>
          <div className="header-text">
            <Typography variant="h5" align="right">
              Trainee UI
            </Typography>
          </div>
          <div className="header-menu">
            <Route
              path="/"
              render={({ location }) => (
                <Fragment>
                  <Tabs value={location.pathname}>
                    <Tab
                      label="Profile"
                      component={Link}
                      value="/profile"
                      to="/"
                    />
                    <Tab
                      label="Form-R"
                      component={Link}
                      value="/formr"
                      to="/formr"
                    />
                  </Tabs>
                </Fragment>
              )}
            />
          </div>
          <div className="header-avatar">
            <Button
              aria-controls="settings-menu"
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <Avatar alt="Babul Yasa" src="/static/images/avatar/1.jpg" />
            </Button>
            <AccountSettingsPopupMenu
              id="settings-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
            ></AccountSettingsPopupMenu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavbarComponent;
