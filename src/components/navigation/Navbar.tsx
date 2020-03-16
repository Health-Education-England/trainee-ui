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
          <Header.Search></Header.Search>
        </Header.Content>
      </Header.Container>
      <Header.Nav title="Menu">
        <Header.NavItem href="/profile">Profile</Header.NavItem>
        <Header.NavItem href="/">Forms</Header.NavItem>
        <Header.NavItem>
          <Logout></Logout>
        </Header.NavItem>
      </Header.Nav>
    </Header>
  );
};

export default Navbar;
