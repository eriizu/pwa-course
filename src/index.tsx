import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";
import Login from "./Views/Login";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Notifications from "react-notify-toast";

ReactDOM.render(
  <React.StrictMode>
    <Notifications></Notifications>
    <Router>
      <Switch>
        <Route path="/" exact render={() => <App />}></Route>
        <Route path="/login" render={(props) => <Login {...props} />}></Route>
      </Switch>
    </Router>
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
Notification.requestPermission();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

navigator.geolocation.getCurrentPosition(function (position) {
  console.log(position);
  // console.log("Latitude is :", position.coords.latitude);
  // console.log("Longitude is :", position.coords.longitude);
});
