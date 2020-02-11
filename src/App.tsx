import React, { Fragment } from "react";
import "./App.scss";
import Profile from "./components/profile/ProfileComponent";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import LogInComponent from "./components/authentication/LogInComponent";
import Navbar from "./components/navigation/NavbarComponent";

const App: React.FC = () => {
  return (
    <Fragment>
      <Navbar />
      <main>
        <BrowserRouter>
          <Switch>
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={LogInComponent} />
            <Redirect exact path="/" to="/login" />
          </Switch>
        </BrowserRouter>
      </main>
    </Fragment>
  );
};

export default App;
