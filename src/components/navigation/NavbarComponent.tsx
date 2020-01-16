import React from "react";

let Header = require('nhsuk-react-components/lib/components/header').default;

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
      <Header style={{ width: '100%'}}>
        <Header.Container>
          <Header.Logo />
          <Header.Content>
            <Header.MenuToggle />
            <Header.Search />
          </Header.Content>
        </Header.Container>
        <Header.Navigation title="Menu">
          <Header.Link href="/profile">
            My details
          </Header.Link>
          <Header.Link href="/">
            My placements
          </Header.Link>
          <Header.Link href="/">
            My assessments
          </Header.Link>
          <Header.Link href="/">
            My forms
          </Header.Link>
          <Header.Link href="/">
            My training
          </Header.Link>
        </Header.Navigation>
      </Header>
    );
  }
}

export default NavbarComponent;
