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
      this.setState({ description: null, serverSpecifics: null });
      return;
    }

    const description = (
      <td>
        <table>
          <thead>
            <tr>
              <th>{item.name}</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(item.marketInfo).map((server, index) => (
              <tr
                onClick={this.displayServerSpecifics.bind(this, item, server)}
              >
                <td key={index}>
                  {server + ": " + item.marketInfo[server].price + " gil"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </td>
    );
    this.setState({ description: { description, itemName: item.name } });
  }

  displayServerSpecifics(item, server, e) {
    if (this.state.serverSpecifics?.server === server) {
      this.setState({ serverSpecifics: null });
      return;
    }

    const serverSpecifics = (
      <td>
        <table>
          <thead>
            <tr>
              <th colspan="2">{server}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Past Week's Sales (Overall):</td>
              <td>{item.marketInfo[server].saleVelocity.overall*7}</td>
            </tr>
            <tr>
              <td>Past Week's Sales (NQ)</td>
              <td>{item.marketInfo[server].saleVelocity.nq*7}</td>
            </tr>
            <tr>
              <td>Past Week's Sales (HQ)</td>
              <td>{item.marketInfo[server].saleVelocity.hq*7}</td>
            </tr>
            <tr>
              <td>Average Price</td>
              <td>{item.marketInfo[server].avgPrice.overall.toFixed(3)}</td>
            </tr>
            <tr>
              <td>Average NQ Price</td>
              <td>{item.marketInfo[server].avgPrice.nq.toFixed(3)}</td>
            </tr>
            <tr>
              <td>Average HQ Price</td>
              <td>{item.marketInfo[server].avgPrice.hq.toFixed(3)}</td>
            </tr>
            <tr>
              <td>Most Recent Upload Time</td>
            </tr>
          </tbody>
        </table>
      </td>
    );
    this.setState({
      serverSpecifics: { serverSpecifics, server },
    });
  }

  render() {
    const { node, items, description, serverSpecifics } = this.state;
    return (
      <>
        <tr>
          <td>
            {node.location.map} ({node.location.x},{node.location.y})
          </td>
          <td>{items}</td>
          <TimerTimeElement node={node} />
        </tr>
        <tr>
          {description?.description}
          {serverSpecifics?.serverSpecifics}
        </tr>
      </>
    );
  }
}
