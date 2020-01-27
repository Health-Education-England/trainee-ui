import React from "react";
import "./App.css";
import Profile from "./components/profile/ProfileComponent";
import BottomNavbar from "./components/navigation/BottomNavbarComponent";
import { Switch, Route, Redirect } from "react-router-dom";
import FormR from "./components/FormR";
import LogInComponent from "./components/authentication/LogInComponent";
import Navbar from "./components/navigation/NavbarComponent";

const App: React.FC = () => {
  return (
    <div>
      <div style={{ paddingBottom: '56px'}}>
        <Navbar />
        <Switch>
          <Route path="/formr" component={FormR} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/login" component={LogInComponent} />
          <Redirect exact path="/" to="/profile" />
        </Switch>
      </div>
      <div className="bottom-navigation-menu">
        <BottomNavbar></BottomNavbar>
      </div>
    </div>
  );
};

export default App;
