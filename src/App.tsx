import React, { Fragment } from "react";
import "./App.scss";
import Profile from "./components/profile/Profile";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import Login from "./components/authentication/Login";
import PageNotFound from "./components/common/PageNotFound";
import HEEFooter from "./components/navigation/HEEFooter";

interface IState {
  isAuthenticated: boolean;
}

class App extends React.PureComponent<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isAuthenticated: false
    };
  }

  setAuthenticationStatus = async (state: any) => {
    console.log(state);
    if (state === "signedIn") {
      this.setState({
        isAuthenticated: true
      });

      // import { Auth } from "aws-amplify";
      // let user = await Auth.currentAuthenticatedUser();
      // This user is a CognitoUser object which will all the information about the UserPool
      // console.log(user);
      // signInUserSession will give all the toek nrelated information about the signed in user session
      // console.log(user.signInUserSession);
    } else {
      this.setState({
        isAuthenticated: false
      });
    }
  };

  render() {
    const { isAuthenticated } = this.state;

    return isAuthenticated ? (
      <Fragment>
        <Navbar setAuthenticationStatus={this.setAuthenticationStatus} />
        <main>
          <BrowserRouter>
            <Switch>
              <Route path="/profile" component={Profile} />
              <Route path="/logout" children={<h1>Babul</h1>} />
              <Redirect exact path="/" to="/profile" />
              <Route path="/*" component={PageNotFound} />
            </Switch>
          </BrowserRouter>
        </main>
        <HEEFooter />
      </Fragment>
    ) : (
      <Login setAuthenticationStatus={this.setAuthenticationStatus}></Login>
    );
  }
}

export default App;
