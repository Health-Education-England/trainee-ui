import React from "react";
import {Header} from 'nhsuk-react-components';

interface INavbarProps {}
interface INavbarState {
  anchorEl: any;
}

class NavbarComponent extends React.PureComponent<INavbarProps, INavbarState> {
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
      <Header style={{ width: '100%', position: 'sticky', top: '0'}}>
        <Header.Container>
          <Header.Logo />
          <Header.Content>
            <Header.MenuToggle />
            <Header.Search />
          </Header.Content>
        </Header.Container>
        <Header.Nav title="Menu">
          <Header.NavItem href="/profile">
            My details
          </Header.NavItem>
          <Header.NavItem href="/">
            My placements
          </Header.NavItem>
          <Header.NavItem href="/">
            My assessments
          </Header.NavItem>
          <Header.NavItem href="/">
            My forms
          </Header.NavItem>
          <Header.NavItem href="/">
            My training
          </Header.NavItem>
        </Header.Nav>
      </Header>
    );
  }
}

export default NavbarComponent;
