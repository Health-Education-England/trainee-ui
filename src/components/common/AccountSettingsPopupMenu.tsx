import React from "react";
import { Menu, MenuItem } from "@material-ui/core";

const AccountSettingsPopupMenu = (props: any) => {
  return (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      {...props}
    >
      <MenuItem>Account Settings</MenuItem>
      <MenuItem>Logout</MenuItem>
    </Menu>
  );
};

export default AccountSettingsPopupMenu;
