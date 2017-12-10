import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

const App = () => (
  <Router>
    <div className="app-container">
      <form action="/login" method="post">
        <div>
          <label>Username:</label>
          <input type="text" name="username" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" />
        </div>
        <div>
          <input type="submit" value="Log In" />
        </div>
      </form>
    </div>
  </Router>
);

export default App;
