import React from "react";

import TimerNode from "./TimerNode";
import { getTimeUntilNextSpawn } from "./eorzeaTime";

const apiAddress = process.env.REACT_APP_API_ADDRESS ?? "localhost:5000";
const SERVER = "Chaos"; //TODO should be site wide

/**
 * A container for TimerNodes
 */
export default class TimersCollection extends React.Component {
  constructor() {
    super();
    this.state = { nodes: null, lastUpdated: 0 };
    this.updateSpawnTimes = this.updateSpawnTimes.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  /**
   * For each node in this.state.nodes, save the current time until its next spawn
   */
  updateSpawnTimes() {
    if(this.state.lastUpdated > Date.now()-1000){
      console.log("Cannot update spawn times now. The previous update is too recent");
      return;
    }

    const { nodes } = this.state;

    console.log(this.state);
    const addToState = { lastUpdated: Date.now() };
    nodes.forEach(
      (node) => (addToState[node._id] = getTimeUntilNextSpawn(node))
    );
    console.log(addToState);
    this.setState(addToState);
  }

  /**
   * Fetch all nodes from the API and save them to this.state.nodes along with the times until each next spawns
   */
  async loadData() {
    const nodes = await fetch(
      `http://${apiAddress}/nodes/withItemData/${SERVER}`
    )
      .then((response) => response.json())
      .catch((err) => alert(`Error. Could not access api ${err}`));

    if (nodes === undefined) {
      alert("Nodes is undefined");
    } else {
      const addToState = { nodes };
      nodes.forEach(
        (node) => (addToState[node._id] = getTimeUntilNextSpawn(node))
      );
      this.setState(addToState);
    }
  }

  render() {
    console.log("Rendering");
    const { nodes } = this.state;
    const sortedNodes =
      nodes !== null
        ? nodes.sort((a, b) => this.state[a._id] - this.state[b._id])
        : null;
    const timerNodes = sortedNodes?.map((node) => (
      <TimerNode
        key={node._id + this.state[node._id]}
        node={node}
        timeUntilNextSpawn={this.state[node._id]}
        nodeUpdated={this.updateSpawnTimes}
      />
    ));
    console.log({ nodes, sortedNodes, timerNodes });
    return (
      <section className="timerContainer">{timerNodes ?? "Loading..."}</section>
    );
  }
}
