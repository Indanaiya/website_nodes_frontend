import React from "react";

import TimerNode from "./TimerNode";

const apiAddress = process.env.REACT_APP_API_ADDRESS ?? "localhost:5000";
const SERVER = "Chaos"; //TODO should be site wide

/**
 * A container for TimerNodes
 */
export default class TimersCollection extends React.Component {
  constructor() {
    super();
    this.state = { nodes: [], rows:[<b>Loading...</b>] };
  }

  componentDidMount() {
    this.loadData();
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
      .then((response) => response.text())
      .then((body) => JSON.parse(body))
      .catch((err) =>
        console.log(
          //TODO should display a message to the user
          `Error. Could not access api ${err}`
        )
      );

    if (nodes === undefined) {
      console.log("Nodes is undefined");
    } else if (nodes.length > 0) {
      this.setState({
        rows: nodes.map((node, index) => <TimerNode key={index} node={node} />),
      }); //Using index as key as loadData should only run once, so the keys wont change
    } else {
      this.setState({ rows: [] });
    }
  }

  render() {
    const { rows } = this.state;
    return (
      <section className="timerContainer">
        {rows}
      </section>
    );
  }
}
