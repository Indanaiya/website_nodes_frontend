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
            className="clickable"
            onClick={this.displayItemDetails.bind(this, item)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    );
    this.removeItemDetails = this.removeItemDetails.bind(this);
    this.state = { description: null };
  }

  displayItemDetails(item) {
    const description = (
      <ItemDetails item={item} removeItemDetails={this.removeItemDetails} />
    );
    this.setState({ description });
  }

  removeItemDetails() {
    this.setState({ description: null });
  }

  render() {
    const { description } = this.state;
    return description ?? this.itemsList;
  }
}
