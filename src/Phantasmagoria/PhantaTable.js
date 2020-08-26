import React from "react";

function PhantaRow(props) {
  const item = props.item;

  return (
    <tr>
      <td>{item.tomestonePrice}</td>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>{item.price / item.tomestonePrice}</td>
    </tr>
  );
}

function PhantaRows(props) {
  console.log(props.items);
  props.items.map(
    (item) =>
      (item.price = Math.min(
        ...Object.keys(item.marketInfo).map((key) => item.marketInfo[key].price)
      ))
  );
  return props.items
    .sort((itemA, itemB) => itemB.price - itemA.price)
    .map((item) => <PhantaRow item={item} />);
}

export default class TestTable extends React.Component {
  constructor() {
    super();
    this.state = { phantaMats: [] };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const itemsJson = await fetch(
      "http://localhost:5000/items/phantasmagoria?datacenter=Chaos"
    )
      .then((response) => response.text())
      .then((body) => JSON.parse(body));

    if (itemsJson) {
      this.setState({ phantaMats: itemsJson });
    }
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Tomestone Price</th>
            <th>Material</th>
            <th>Price per item</th>
            <th>Price per tomestone</th>
          </tr>
        </thead>
        <tbody>
          <PhantaRows items={this.state.phantaMats} />
        </tbody>
      </table>
    );
  }
}
