import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";

import "./App.css";
import Contents from "./Contents.js";

function App() {
  return (
    <Router>
      <nav className="sidebar">
        <NavLink to="/phantasmagoria">Phantasmagoria</NavLink>
        <br/>
        <NavLink exact to="/">
          Root
        </NavLink>
      </nav>
      <div className="content">
        <Contents />
      </div>
    </Router>
  );
}

export default App;
