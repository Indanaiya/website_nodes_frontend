import React from "react";

import ServerSpecifics from "./ServerSpecifics";

export default class ItemDetails extends React.Component {
  constructor({ item, removeItemDetails }) {
    super();
    this.displayServerSpecifics = this.displayServerSpecifics.bind(this);
    this.removeServerSpecifics = this.removeServerSpecifics.bind(this);
    this.state = {};

    this.itemDetails = (
      <table className="details">
        <thead>
          <tr>
            <th colSpan="2">
              <div>
                <button
                  type="button"
                  className="clickable"
                  onClick={removeItemDetails}
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
  }

  displayServerSpecifics(marketInfo, server, itemName) {
    //marketInfo: {saleVelocity, avgPrice, lastUploadTime} ,server, itemName, removeServerSpecifics
    const serverSpecifics = (
      <ServerSpecifics
        marketInfo={marketInfo}
        server={server}
        itemName={itemName}
        removeServerSpecifics={this.removeServerSpecifics}
      />
    );
    this.setState({ serverSpecifics });
  }

  removeServerSpecifics() {
    this.setState({ serverSpecifics: null });
  }

  render() {
    return this.state.serverSpecifics ?? this.itemDetails;
  }
}
