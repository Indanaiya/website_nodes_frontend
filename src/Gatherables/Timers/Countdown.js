import React from "react";

import { timer } from "../../App.js";

/**
 * A component to display a timer counting down to a specified time
 * Props: targetTime - The time being counted down to
 *  countdownComplete - A callback to be executed when the targetTime is reached
 */
export default class Countdown extends React.Component {
  /**
   * Initialises the state
   */
  constructor() {
    super();
    this.state = {time: null};
  }

  /**
   * Subscribes to a timer to update the time every second
   */
  componentDidMount() {
    timer.subscribe(this, () => {
      const time = new Date(this.props.targetTime - Date.now());
      if (time.getTime() <= 0) {
        this.props.countdownComplete();
        this.setState({ time: new Date(0) });
      } else {
        this.setState({ time });
      }
    });
  }

  /**
   * Unsubscribes from the timer
   */
  componentWillUnmount() {
    timer.unsubscribe(this);
  }

  /**
   * Displays the time stored in this.state.time in the format HH:MM
   */
  render() {
    const { time } = this.state;
    return (
      <>
        {time !== null
          ? `${String(time.getMinutes()).padStart(2, "0")}:${String(
              time.getSeconds()
            ).padStart(2, "0")}`
          : "Loading..."}
      </>
    );
  }
}
