import React from "react";

import TimerTimeElement from "./TimerTimeElement";

/**
 * A class to represent one gathering node
 */
export default class TimerNode extends React.Component {
  constructor({ node }) {
    super();
    //Creates an unordered list of items gatherable from the node represented by this row
    //Saves that unordered list and the node itself to state
    this.state = {
      node,
      items: (
        <ul>
          {node.items.map((item, index) => (
            <li
              key={index}
              className="clickable"
              onClick={this.displayItemDetails.bind(this, item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      ),
    };
  }

  displayItemDetails(item) {
    const description = (
      <table className="details">
        <thead>
          <tr>
            <th colSpan="2">
              <div>
                <button
                  type="button"
                  className="clickable"
                  onClick={this.removeItemDetails.bind(this)}
                >
                  &#5130;
                </button>
                <span>{item.name}</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(item.marketInfo).map((server, index) => (
            <tr
              key={index}
              className="clickable"
              onClick={this.displayServerSpecifics.bind(
                this,
                item.marketInfo[server],
                server
              )}
            >
              <td>{server}</td>
              <td>{item.marketInfo[server].price + " gil"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
    this.setState({ description });
  }

  displayServerSpecifics({ saleVelocity, avgPrice, lastUploadTime }, server) {
    const lastUploadTimeDate = new Date(lastUploadTime);
    const lastUploadTimeString =
      lastUploadTimeDate.getUTCDate() +
      1 +
      "/" +
      (lastUploadTimeDate.getUTCMonth() + 1) +
      "/" +
      lastUploadTimeDate.getUTCFullYear();

    const serverSpecifics = (
      <table className="details">
        <thead>
          <tr>
            <th colSpan="2">
              <div>
                <button
                  type="button"
                  className="clickable"
                  onClick={this.removeServerSpecifics.bind(this)}
                >
                  &#5130;
                </button>
                <span>{server}</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Past Week's Sales (Overall):</td>
            <td>{saleVelocity.overall * 7}</td>
          </tr>
          <tr>
            <td>Past Week's Sales (NQ)</td>
            <td>{saleVelocity.nq * 7}</td>
          </tr>
          <tr>
            <td>Past Week's Sales (HQ)</td>
            <td>{saleVelocity.hq * 7}</td>
          </tr>
          <tr>
            <td>Average Price</td>
            <td>{avgPrice.overall.toFixed(3)}</td>
          </tr>
          <tr>
            <td>Average NQ Price</td>
            <td>{avgPrice.nq.toFixed(3)}</td>
          </tr>
          <tr>
            <td>Average HQ Price</td>
            <td>{avgPrice.hq.toFixed(3)}</td>
          </tr>
          <tr>
            <td>Most Recent Upload Time</td>
            <td>{lastUploadTimeString}</td>
          </tr>
        </tbody>
      </table>
    );
    this.setState({ serverSpecifics });
  }

  removeItemDetails() {
    this.setState({ description: null });
  }

  removeServerSpecifics() {
    this.setState({ serverSpecifics: null });
  }

  render() {
    const { node, items, description, serverSpecifics } = this.state;
    return (
      <div className="node">
        <header>
          <span className="location">
            {node.location.map}
            <br />({node.location.x}, {node.location.y})
          </span>
          <TimerTimeElement node={node} />
        </header>
        <div className="main">
          {serverSpecifics
            ? serverSpecifics
            : description
            ? description
            : items}
        </div>
      </div>
    );
  }
}
