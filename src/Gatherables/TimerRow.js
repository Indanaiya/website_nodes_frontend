import React from "react";

import TimerTimeElement from "./TimerTimeElement";

/**
 * A class to represent one gathering node within the TimersTable
 */
export default class TimerRow extends React.Component {
  constructor({ node }) {
    super();
    //Creates an unordered list of items gatherable from the node represented by this row
    //Saves that unordered list and the node itself to state
    this.state = {
      node,
      items: (
        <ul>
          {node.items.map((item, index) => (
            <li key={index} onClick={this.displayItemDetails.bind(this, item)}>
              {item.name}
            </li>
          ))}
        </ul>
      ),
    };
  }

  /**
   * Toggle the display of details about an item. 
   * If details about a different item for this row was displayed, that will be replaced with details about the supplied item.
   * 
   * @param {*} item The item for information about to be displayed or hidden
   * @param {*} e The Event
   */
  displayItemDetails(item, e) {
    if (this.state.description?.itemName === item.name) {
      this.setState({ description: null });
      return;
    }

    const description = (
      <table>
        <thead>
          <th>{item.name}</th>
        </thead>
        <tbody>
          {Object.keys(item.prices).map((server) => (
            <tr>
              <td>{server + ": " + item.prices[server].price + " gil"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
    this.setState({ description:{description, itemName: item.name} });
  }

  render() {
    const { node, items, description } = this.state;
    return (
      <>
        <tr>
          <td>
            {node.location.map} ({node.location.x},{node.location.y})
          </td>
          <td>{items}</td>
          <TimerTimeElement node={node} />
        </tr>
        {description?.description}
      </>
    );
  }
}
