import React from "react";

import TimerTimeElement from './TimerTimeElement'

const apiAddress = process.env.REACT_APP_API_ADDRESS ?? "localhost:5000";
const SERVER = "Cerberus";

export default class Timers extends React.Component {
  constructor() {
    super();
    this.state = { nodes: [] };
  }

  componentDidMount() {
    this.loadData();
  }

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
      this.setState({ nodes });
    } else {
      this.setState({ nodes: [] });
    }
  }

  render() {
    const rows = this.state.nodes.map((node) => {

      return (
        <>
          <tr>
            <td>
              {node.location.map} ({node.location.x},{node.location.y})
            </td>
            <td>
              <ul>
                {node.items.map((item) => (
                  <li>{item.name}</li>
                ))}
              </ul>
            </td>
            <TimerTimeElement node={node}/>
          </tr>
        </>
      );
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Location</th>
            <th>Items</th>
            <th>Time Until Next Spawn</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
