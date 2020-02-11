import React from "react";
import { Header } from "nhsuk-react-components";
import styles from "./NavbarComponent.module.scss";

interface INavbarProps {}
interface INavbarState {
  anchorEl: any;
}

class NavbarComponent extends React.PureComponent<INavbarProps, INavbarState> {
  render() {
    return (
      <Header className={styles.header}>
        <Header.Container>
          <Header.Logo />
          <Header.Content>
            <Header.MenuToggle />
            <Header.Search />
          </Header.Content>
        </Header.Container>
        <Header.Nav title="Menu">
          <Header.NavItem href="/profile">My details</Header.NavItem>
          <Header.NavItem href="/">My placements</Header.NavItem>
          <Header.NavItem href="/">My assessments</Header.NavItem>
          <Header.NavItem href="/">My forms</Header.NavItem>
          <Header.NavItem href="/">My training</Header.NavItem>
          <Header.NavItem href="/">Logout</Header.NavItem>
        </Header.Nav>
      </Header>
    );
  }
}

export default NavbarComponent;
