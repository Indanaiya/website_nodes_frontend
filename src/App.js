import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";

import "./App.css";
import Contents from "./Contents.js";

export const timer = {
  subscribers: new Map(),
  subscribe(key, fun) {
    this.subscribers.set(key, fun);
  },
  unsubscribe(key) {
    this.subscribers.delete(key);
  },
};

timer.interval = setInterval(() => {
  for (let fun of timer.subscribers.values()) {
    fun();
  }
}, 1000);

Object.freeze(timer);

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
