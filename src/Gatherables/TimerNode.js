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
                server,
                item.name
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

  displayServerSpecifics(
    { saleVelocity, avgPrice, lastUploadTime },
    server,
    itemName
  ) {
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
                <span>{itemName} ({server})</span>
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

  toggleNodeDetails({ level, name, spawnTimes }) {
    const { nodeDetails } = this.state;
    if (nodeDetails) {
      this.setState({ nodeDetails: null });
      return;
    }

    const newNodeDetails = (
      <table>
        <thead>
          <tr>
            <th colSpan="2" className="nodeName">
              Level {level} {name}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Spawn Times</td>
            <td>
              {spawnTimes
                .map(
                  (spawnTime) =>
                    `${String(Math.floor(spawnTime)).padStart(2, "0")}:${String(
                      spawnTime % 1
                    ).padStart(2, "0")}`
                )
                .join(", ")}
            </td>
          </tr>
        </tbody>
      </table>
    );

    this.setState({ nodeDetails: newNodeDetails });
  }

  render() {
    const {
      node,
      items,
      description,
      serverSpecifics,
      nodeDetails,
    } = this.state;
    return (
      <div className="node">
        <header onClick={this.toggleNodeDetails.bind(this, node)}>
          <span className="location">
            {node.location.map}
            <br />({node.location.x}, {node.location.y})
          </span>
          <TimerTimeElement node={node} />
        </header>
        <div className="main">
          {nodeDetails ?? serverSpecifics ?? description ?? items}
        </div>
      </div>
    );
  }
}
