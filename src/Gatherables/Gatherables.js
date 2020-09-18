import React from "react";

import FilterBar from "./Filters/FilterBar.js";
import TimersCollection from "./Timers/TimersCollection.js";
import "./gatherables.css";

export default function Gatherables() {
  return (
    <>
      <FilterBar />
      <TimersCollection />
    </>
  );
}
