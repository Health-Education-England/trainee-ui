import React from "react";
import { Header } from "nhsuk-react-components";
import Logout from "../authentication/Logout";

const Navbar = () => {
  return (
    <Header.Nav title="Menu">
      <Header.NavItem href="/profile">Profile</Header.NavItem>
      <Header.NavItem href="/formr-a">Form R-a</Header.NavItem>
      <Header.NavItem href="/formr-b">Form R-b</Header.NavItem>

      <Logout></Logout>
    </Header.Nav>
  );
};

export default Navbar;
