import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Amplify from "aws-amplify";

import store from "./redux/store/store";

async function fetchData() {
  const fetchedData = await fetch("/api/environment")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response error");
      }
      return response.json();
    })
    .then(envData => envData.auth)
    .catch(error => {
      console.error("There is a problem fetching the app data: ", error);
    });
  return fetchedData;
}

async function configAmp() {
  const theFetchedData = await fetchData();
  console.log("theFetchedData: ", theFetchedData);
  Amplify.configure({ Auth: theFetchedData });
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
  serviceWorker.register();
}

configAmp();
