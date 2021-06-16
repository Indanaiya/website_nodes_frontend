import React from "react";

import ItemDetails from "./ItemDetails";
import ScripDetails from "./ScripDetails";

/**
 * A component class for displaying a single item
 */
export default class Items extends React.Component {
  constructor({ items }) {
    super();
    console.log({ items });
    this.itemsList = (
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {typeof item.marketInfo !== "undefined" ? (
              <span
                onClick={this.displayItemDetails.bind(this, item)}
                className="name clickable"
              >
                {item.name}
              </span>
            ) : (
              <span className="name">{item.name}</span>
            )}
            {item.task?.whiteScrips ? (
              <img
                className="clickable"
                onClick={this.displayScripDetails.bind(
                  this,
                  item,
                  "whiteScrips"
                )}
                src="https://xivapi.com/i/065000/065069.png"
                alt="White Scrips"
              />
            ) : null}
            {item.task?.yellowScrips ? (
              <img
                className="clickable"
                onClick={this.displayScripDetails.bind(
                  this,
                  item,
                  "yellowScrips"
                )}
                src="https://xivapi.com/i/065000/065043.png"
                alt="Yellow Scrips"
              />
            ) : null}
            {item.task?.aetherialReduce?.length > 0 ? (
              <img
                className="clickable"
                onClick={this.displayItemDetails.bind(
                  this,
                  item.task.aetherialReduce[0]
                )}
                src={`https://xivapi.com${item.task.aetherialReduce[0].icon}`}
                alt={item.task.aetherialReduce[0].name}
              />
            ) : null}
          </li>
        ))}
      </ul>
    );
    this.removeItemDetails = this.removeItemDetails.bind(this);
    this.removeScripDetails = this.removeScripDetails.bind(this);
    this.state = { description: null, scripDetails: null };
  }

  displayItemDetails(item) {
    this.setState({ description: item });
  }

  displayScripDetails(item, scrips) {
    this.setState({ scripDetails: { item, scrips } });
  }

  removeItemDetails() {
    this.setState({ description: null });
  }

  removeScripDetails() {
    this.setState({ scripDetails: null });
  }

  render() {
    const { description, scripDetails } = this.state;
    return description ? (
      <ItemDetails
        item={description}
        removeItemDetails={this.removeItemDetails}
      />
    ) : scripDetails ? (
      <ScripDetails
        item={scripDetails.item}
        scrips={scripDetails.scrips}
        removeDetails={this.removeScripDetails}
      />
    ) : (
      this.itemsList
    );
  }
}
