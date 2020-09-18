import React from "react";

import ServerSpecifics from "./ServerSpecifics";

/**
 * A component class to display the prices for a given item on different servers
 */
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

  /**
   * Display more detail about market information for a specific server
   * 
   * @param {{saleVelocity: number,avgPrice:number,lastUploadTime:number}} marketInfo 
   * @param {string} server 
   * @param {string} itemName 
   */
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

  /**
   * Go back to displaying prices for many servers
   */
  removeServerSpecifics() {
    this.setState({ serverSpecifics: null });
  }

  render() {
    return this.state.serverSpecifics ?? this.itemDetails;
  }
}
