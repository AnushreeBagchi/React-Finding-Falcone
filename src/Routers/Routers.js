import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import App from "../components/App";
import NotFound from "../components/NotFound";
import Result from "../components/Result";
import ErrorNotification from "../components/ErrorNotification";

export default function Routers() {
  return (
    <Router>
      <div>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/result" component={Result}/>
            <Route exact path="/error" component={ErrorNotification}/>
            <Route exact component={NotFound}/>
        </Switch>
      </div>
    </Router>
  );
}