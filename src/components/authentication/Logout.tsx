import React from "react";
import { SignOut } from "aws-amplify-react";
import { Auth } from "aws-amplify";
import styles from "./Logout.module.scss";

class Logout extends SignOut {
  render() {
    return (
      <li className="nhsuk-header__navigation-item">
        <button
          type="button"
          className={styles.logout}
          onClick={async () => {
            await Auth.signOut();
          }}
        >
          Logout
        </button>
      </li>
    );
  }
}

export default Logout;
