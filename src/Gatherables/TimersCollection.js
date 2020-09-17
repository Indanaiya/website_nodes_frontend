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
    this.nodeUpdated = this.nodeUpdated.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  nodeUpdated() {
    console.log("nodeUpdated");
    const now = Date.now();
    if (this.state.lastUpdated < now - 1000) {
      console.log("updating All");
      this.setState({ lastUpdated: now });
      this.updateSpawnTimes();
    }
  }

  updateSpawnTimes() {
    const { nodes } = this.state;

    const addToState = {};
    nodes.forEach(
      (node) => (addToState[node._id] = getTimeUntilNextSpawn(node))
    );
    this.setState(addToState);
  }

  /**
   * Fetch the list of nodes from the API.
   * Create a <TimerRow> for each node returned and add that as an array to the state under the key 'rows'.
   * Sets rows to an empty array if no nodes were retrieved.
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
    const { nodes } = this.state;
    const sortedNodes = nodes
      ? nodes.sort((a, b) => this.state[a._id] - this.state[b._id])
      : null;
      
    return (
      <section className="timerContainer">
        {sortedNodes?.map((node) => (
          <TimerNode
            key={node.id}
            node={node}
            timeUntilNextSpawn={this.state[node._id]}
            nodeUpdated={this.nodeUpdated}
          />
        )) ?? "Loading..."}
      </section>
    );
  }
}
