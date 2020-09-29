import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import {
  Router,
  Route,
  Switch,
  BrowserRouter,
  HashRouter,
} from "react-router-dom";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.4.0";
import "assets/css/demo.css";
import { Provider } from "react-redux";

import AdminLayout from "layouts/Admin.js";
import LoginPage from "components/Login/LoginPage";
import SecureRoute from "components/Login/SecureRoute";
import setJwt from "./components/Login/SetJwt";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./actions/Types";
import { logout } from "./actions/SecurityAction";
import UserPage from "views/UserPage";
import { hydrate } from "react-dom";
import "bootstrap/dist/js/bootstrap.min.js";
import Clients from "views/Clients";
import ClientDetail from "views/ClientDetail";

const hist = createBrowserHistory();

const jwt = localStorage.jwt;
if (jwt) {
  setJwt(jwt);
  const decoded = jwt_decode(jwt);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded,
  });

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

ReactDOM.render(
  <Provider store={store}>
    <HashRouter basename="/">
      <Route exact path="/" component={LoginPage} />
      <Switch>
        <SecureRoute path="/admin" component={AdminLayout} />
        <SecureRoute path="/users" component={Clients} />
        <SecureRoute path="/admin/details/:id" component={UserPage} />
        <SecureRoute path="/admin/client/:id" component={ClientDetail} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
