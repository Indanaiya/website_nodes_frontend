import React from "react";

import FilterBar from "./FilterBar.js";
import TimersCollection from "./TimersCollection.js";
import "./gatherables.css";

export default function Gatherables() {
  return (
    <>
      <FilterBar />
      <TimersCollection />
    </>
  );
}
