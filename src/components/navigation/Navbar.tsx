import React from "react";
import { Header } from "nhsuk-react-components";
import styles from "./Navbar.module.scss";
import Logout from "../authentication/Logout";

const Navbar = (props: any) => {
  return (
    <Header className={styles.header}>
      <Header.Container>
        <Header.Logo />
        <Header.Content>
          <Header.MenuToggle />
          <Logout></Logout>
        </Header.Content>
      </Header.Container>
      <Header.Nav title="Menu">
        <Header.NavItem href="/profile">My details</Header.NavItem>
        <Header.NavItem href="/">My placements</Header.NavItem>
        <Header.NavItem href="/">My assessments</Header.NavItem>
        <Header.NavItem href="/">My forms</Header.NavItem>
        <Header.NavItem href="/">My training</Header.NavItem>
      </Header.Nav>
    </Header>
  );
};

export default Navbar;
