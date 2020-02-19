import React, { Fragment } from "react";
import "./App.scss";
import Profile from "./components/profile/Profile";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import Login from "./components/authentication/Login";
import PageNotFound from "./components/common/PageNotFound";
import HEEFooter from "./components/navigation/HEEFooter";
import Placements from "./components/placements/Placements";

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
    if (state === "signedIn") {
      this.setState({
        isAuthenticated: true
      });
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
        <Navbar />
        <main>
          <BrowserRouter>
            <Switch>
              <Route path="/profile" component={Profile} />
              <Route path="/placements" component={Placements} />
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
