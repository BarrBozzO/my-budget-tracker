import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Welcome from "../Welcome/Welcome";
import Dashboard from "../Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={() => <p>no page</p>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
