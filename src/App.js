import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";

import "./App.css";
import Contents from "./Contents.js";

function App() {
  return (
    <Router>
      <nav className="sidebar">
        <NavLink to="/timers">
          <div>Gathering Node Timers</div>
        </NavLink>
        <br />
        <NavLink to="/phantasmagoria">
          <div>Phantasmagoria</div>
        </NavLink>
        <br />
        <NavLink exact to="/">
          <div>Root</div>
        </NavLink>
      </nav>
      <div className="content">
        <Contents />
      </div>
    </Router>
  );
}

export default App;
