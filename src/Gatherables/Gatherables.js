import React from "react";

import FilterBar from './FilterBar.js'
import TimersCollection from './TimersCollection.js'
import './gatherables.css'


export default class Gatherables extends React.Component {
  render() {
    return (
      <>
        <FilterBar/>
        <TimersCollection />
      </>
    );
  }
}
