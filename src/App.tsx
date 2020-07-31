import React, { Fragment } from "react";
import "./App.scss";
import Profile from "./components/profile/Profile";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import Login from "./components/authentication/Login";
import PageNotFound from "./components/common/PageNotFound";
import HEEFooter from "./components/navigation/HEEFooter";
import FormRPartA from "./components/forms/formr-part-a/FormRPartA";
import FormRPartB from "./components/forms/formr-part-b/FormRPartB";
import { CacheUtilities } from "./utilities/CacheUtilities";
import packageJson from "../package.json";

const globalAny: any = global;
globalAny.appVersion = packageJson.version;

interface AppState {
  isAuthenticated: boolean;
  isLatestVersion: boolean;
}

interface AppProps {}

class App extends React.PureComponent<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isLatestVersion: false
    };
  }

  componentDidMount() {
    fetch("/meta.json")
      .then(response => response.json())
      .then(meta => {
        const latestVersion = meta.version;
        const currentVersion = globalAny.appVersion;
        const shouldForceRefresh = CacheUtilities.SemverGreaterThan(
          latestVersion,
          currentVersion
        );
        if (shouldForceRefresh) {
          CacheUtilities.RefreshCacheAndReload();
          this.setState({ isLatestVersion: true });
        } else {
          this.setState({ isLatestVersion: true });
        }
      });
  }

  setAuthenticationStatus = async (state: string) => {
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
    const { isAuthenticated, isLatestVersion } = this.state;

    return isAuthenticated && isLatestVersion ? (
      <Fragment>
        <Navbar />
        <main className="nhsuk-width-container nhsuk-u-margin-top-5">
          <BrowserRouter>
            <Switch>
              <Route path="/profile" component={Profile} />
              <Route path="/formr-a" component={FormRPartA} />
              <Route path="/formr-b" component={FormRPartB} />
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
