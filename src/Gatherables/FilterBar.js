import React from "react";

import Filter from "./Filter.js";

export default class FilterBar extends React.Component {
  render() {
    return (
        <div className="filter">
          <Filter name="patches" optionNames={[2,3,4,5]}/>
          <Filter name="classes" optionNames={["MIN", "BTN","FSH"]}/>
          <Filter name="tasks" optionNames={["Reducible", "White Scrips", "Yellow Scrips"]}/>
        </div>
    );
  }
}
