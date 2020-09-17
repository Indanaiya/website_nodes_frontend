import React from "react";

import { timer } from "../App.js";

/**
 * A component to display a timer counting down to a specified time
 */
export default class Countdown extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    timer.subscribe(this, () => {
      const time = new Date(this.props.targetTime - Date.now());
      if (time.getTime() <= 0) {
        console.log("hi");
        this.props.countdownComplete();
        this.setState({ time: 0 });
      }
      this.setState({ time });
    });
  }

  componentWillUnmount() {
    timer.unsubscribe(this);
  }

  render() {
    const { time } = this.state;
    return (
      <>
        {time
          ? `${String(time.getMinutes()).padStart(2, "0")}:${String(
              time.getSeconds()
            ).padStart(2, "0")}`
          : "Loading..."}
      </>
    );
  }
}
