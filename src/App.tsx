import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import Profile from './components/Profile/ProfileComponent';
import BottomNavbar from './components/navigation/BottomNavbarComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import FormR from './components/FormR';
import LogInComponent from './components/authentication/LogInComponent';
import Navbar from './components/navigation/NavbarComponent';

if (process.env.NODE_ENV !== 'production') {
  var axe = require('react-axe');
  axe(React, ReactDOM, 1000);
}

const App: React.FC = () => {
  return (
    <Fragment>
      <Navbar />
      <main>
        <Switch>
          <Route path="/formr" component={FormR} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/login" component={LogInComponent} />
          <Redirect exact path="/" to="/profile" />
        </Switch>
      </main>
      <footer className="bottom-navigation-menu">
        <BottomNavbar></BottomNavbar>
      </footer>
    </Fragment>
  );
};

export default App;
