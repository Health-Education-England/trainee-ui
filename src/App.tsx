import React, { Fragment } from "react";
import "./App.scss";
import Profile from "./components/profile/Profile";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import Login from "./components/authentication/Login";

const App: React.FC = () => {
  return (
    <Fragment>
      <Navbar />
      <main>
        <BrowserRouter>
          <Switch>
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <Redirect exact path="/" to="/login" />
          </Switch>
        </BrowserRouter>
      </main>
    </Fragment>
  );
};

export default App;
