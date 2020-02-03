import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://abba1f8a43dd4da4a00277b34beaaf59@sentry.io/1882746',
  environment: process.env.NODE_ENV
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
serviceWorker.register();
