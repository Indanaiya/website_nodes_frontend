import React from "react";

export default class Filter extends React.Component {
  constructor({ name, optionNames }) {
    super();
    const options = {};
    optionNames.forEach((optionName) => (options[optionName] = false));
    this.state = { name, options };
  }

  selectOption(id, e) {
    const options = Object.assign(this.state.options);
    options[id] = !options[id];
    this.setState({ options });
  }

  render() {
    const { name, options } = this.state;
    return (
      <div className={name}>
        <h3> {name}</h3>
        <ul className={name}>
          {Object.keys(options).map((option) => (
            <li
              id={`${name}${option}`}
              className={options[option] ? "selected" : null}
              onClick={this.selectOption.bind(this, option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
