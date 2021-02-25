import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as Sentry from "@sentry/browser";
import Amplify from "aws-amplify";
import config from "./aws-amplify/config";

import store from "./redux/store/store";

let envName = "development";
let congitoAuth = {
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    authenticationFlowType: config.cognito.USER_PASSWORD_AUTH
  }
};

const fetchEnvdata = () => {
  fetch("/api/environment")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response error");
      }
      return response.json();
    })
    .then(envData => {
      envName = envData["envName"]; // needs checking against json obj
      congitoAuth = { Auth: JSON.parse(envData["auth"]) }; // needs checking too
    })
    .catch(error => {
      console.error("There is a problem fetching the data: ", error);
    });
};

if (process.env.NODE_ENV !== "development") {
  fetchEnvdata();
}

Sentry.init({
  dsn: "https://abba1f8a43dd4da4a00277b34beaaf59@sentry.io/1882746",
  environment: envName
});

Amplify.configure(congitoAuth);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.register();
