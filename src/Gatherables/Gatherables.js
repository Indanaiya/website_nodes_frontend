import React from "react";

import FilterBar from './FilterBar.js'
import TimersTable from './TimersTable.js'
import './gatherables.css'


export default class Gatherables extends React.Component {
  render() {
    return (
      <>
        <FilterBar/>
        <TimersTable />
      </>
    );
  }
}
