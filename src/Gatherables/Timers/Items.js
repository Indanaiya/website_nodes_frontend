import React from "react";

import ItemDetails from "./ItemDetails";

/**
 * A component class for displaying a single item
 */
export default class Items extends React.Component {
  constructor({ items }) {
    super();

    this.itemsList = (
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
          >
            <span onClick={this.displayItemDetails.bind(this, item)} className="name clickable" >{item.name}</span>
            {item.task?.whiteScrips ? <img className="clickable" src="https://xivapi.com/i/065000/065069.png" alt="White Scrips"/> : null}
            {item.task?.yellowScrips ? <img className="clickable" src="https://xivapi.com/i/065000/065043.png" alt="Yellow Scrips"/> : null}
            {item.task?.aetherialReduce ? "Reducible" : null}
          </li>
        ))}
      </ul>
    );
    this.removeItemDetails = this.removeItemDetails.bind(this);
    this.state = { description: null };
  }

  displayItemDetails(item) {
    this.setState({ description: item });
  }

  removeItemDetails() {
    this.setState({ description: null });
  }

  render() {
    const { description } = this.state;
    return description ? <ItemDetails item={description} removeItemDetails={this.removeItemDetails} /> : this.itemsList;
  }
}
