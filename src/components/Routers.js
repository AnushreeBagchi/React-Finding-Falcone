import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import App from "./App";
import NotFound from "./NotFound";
import Result from "./Result";

export default function Routers() {
  return (
    <Router>
      <div>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/result" component={Result}/>
            <Route exact component={NotFound}/>
        </Switch>
      </div>
    </Router>
  );
}