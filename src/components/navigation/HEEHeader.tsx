import React from "react";
import { Header } from "nhsuk-react-components";
import Navbar from "./Navbar";
import HEEHeaderLogo from "./HEEHeaderLogo";

import styles from "./HEEHeader.module.scss";
const headerOpen = () => {
  return (
    <Header.Container>
      <HEEHeaderLogo />
    </Header.Container>
  );
};
const headerAuthenticated = () => {
  return (
    <>
      <Header.Container>
        <HEEHeaderLogo />
        <Header.Content>
          <Header.MenuToggle data-cy="BtnMenu" />
        </Header.Content>
      </Header.Container>

      <Navbar />
    </>
  );
};
const HEEHeader = (props: any) => {
  return (
    <Header className={styles.header}>
      {props.isAuthenticated ? headerAuthenticated() : headerOpen()}
    </Header>
  );
};

export default HEEHeader;
