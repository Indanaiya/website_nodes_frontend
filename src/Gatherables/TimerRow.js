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

  /**
   * Display price and scrip details.
   * Temporary function.
   *
   * @param {*} item
   * @param {*} e
   */
  displayItemDetails(item, e) {
    this.displayPriceDetails(item, e);

    if (item.task?.yellowScrips) {
      this.displayScripDetails(item.task.yellowScrips, "Yellow", e);
    } else if (item.task?.whiteScrips) {
      this.displayScripDetails(item.task.whiteScrips, "White", e);
    }
  }

  /**
   *
   * @param {*} scripInfo
   * @param {*} colour
   * @param {*} e
   */
  displayScripDetails(scripInfo, colour, e) {
    if (colour !== "White" && colour !== "Yellow") {
      throw new Error(`Colour must be Yellow or White, it was ${colour}`);
    }
    if (this.state.scripDetails) {
      this.setState({ scripDetails: null });
      return;
    }

    const rows = scripInfo.map(
      ({ collectibility, experience, scrips }, index) => (
        <tr key={index}>
          <td>{collectibility}</td>
          <td>
            {experience[0]}|{experience[1]}
          </td>
          <td>
            {scrips[0]}|{scrips[1]}
          </td>
        </tr>
      )
    );

    const scripTable = (
      <td>
        <table>
          <thead>
            <tr>
              <th colSpan="3">{colour}</th>
            </tr>
            <tr>
              <th>Collectibility</th>
              <th>Experience(Normal|Starred)</th>
              <th>Scrips(Normal|Starred)</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </td>
    );

    this.setState({ scripDetails: scripTable });
  }

  /**
   * Toggle the display of details about an item.
   * If details about a different item for this row was displayed, that will be replaced with details about the supplied item.
   *
   * @param {*} item The item for information about to be displayed or hidden
   * @param {*} e The Event
   */
  displayPriceDetails(item, e) {
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
                key={index}
                className="clickable"
                onClick={this.displayServerSpecifics.bind(
                  this,
                  item.marketInfo[server],
                  server
                )}
              >
                <td>
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

  /**
   * Toggles the display of further information about an item's sales on a specific server.
   * If details for a different server was displayed, that will be replaced with details for the supplied server
   *
   * @param {{salevelocity:{overall:number,nq:number,hq:number}, avgPrice:{overall:number,nq:number,hq:number}, lastUploadTime:String}} marketInfo The marketInfo of the item for information to be displayed about
   * @param {string} server The server that the marketInfo pertains to
   * @param {*} e The Event
   */
  displayServerSpecifics(
    { saleVelocity, avgPrice, lastUploadTime },
    server,
    e
  ) {
    if (this.state.serverSpecifics?.server === server) {
      this.setState({ serverSpecifics: null });
      return;
    }
    const lastUploadTimeDate = new Date(lastUploadTime);
    const lastUploadTimeString =
      lastUploadTimeDate.getUTCDate() +
      1 +
      "/" +
      (lastUploadTimeDate.getUTCMonth() + 1) +
      "/" +
      lastUploadTimeDate.getUTCFullYear();

    const serverSpecifics = (
      <td>
        <table>
          <thead>
            <tr>
              <th colSpan="2">{server}</th>
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
      </td>
    );
    this.setState({
      serverSpecifics: { serverSpecifics, server },
    });
  }

  render() {
    const {
      node,
      items,
      description,
      serverSpecifics,
      scripDetails,
    } = this.state;
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
          {scripDetails}
        </tr>
      </>
    );
  }
}
