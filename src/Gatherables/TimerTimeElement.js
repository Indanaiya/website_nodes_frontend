import React from "react";

import {
  timeUntilInEorzea,
  getEorzeaHoursDecimal,
  LENGTH_OF_EORZEAN_DAY,
} from "./eorzeaTime.js";

/**
 * Get the amount of time, in seconds, until the supplied node spawns or, if the node is currently spawned, the number of seconds since it spawned (as a negative number)
 *
 * @param {{spawnTimes: [number], lifespan:number}} node The node that will be spawning
 * @returns {number} If positive, the time until the supplied node next spawns. If negative, the time since the node last spawned (implying that the node is still up)
 */
function getTimeUntilNextSpawn(node) {
  const eorzeaTime = getEorzeaHoursDecimal();
  for (let spawnTime of node.spawnTimes) {
    if (spawnTime > eorzeaTime) {
      return timeUntilInEorzea(spawnTime);
    } else if (spawnTime + node.lifespan > eorzeaTime) {
      return timeUntilInEorzea(spawnTime) - LENGTH_OF_EORZEAN_DAY;
    }
  }
  return timeUntilInEorzea(node.spawnTimes[0]); //If nothing was returned during the for loop, that means that the next spawn time will be the first one tomorrow.
}

/**
 * A class to display the time until a node spawns or despawns
 */
export default class TimerTimeElement extends React.Component {
  constructor({ node }) {
    super();
    this.state = { node };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        timeUntilNextSpawn: getTimeUntilNextSpawn(this.state.node), //TODO this might be incredibly inefficient
      });
      //console.log(this.state.timeUntilNextSpawn);
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { timeUntilNextSpawn, node } = this.state;
    if (timeUntilNextSpawn === undefined) {
      //Render will be called before componentDidMount finishes setting the time
      return <span className="timer">Loading...</span>;
    }

    let time, className;
    if (timeUntilNextSpawn < 0) {
      className = "activeNode";
      time = (node.lifespan / 24) * LENGTH_OF_EORZEAN_DAY + timeUntilNextSpawn;
    } else {
      className = "inactiveNode";
      time = timeUntilNextSpawn;
    }

    return (
      <span className={`${className} timer`}>
          {String(Math.floor(time / 60)).padStart(2, "0")}:
          {String(Math.floor(time % 60)).padStart(2, "0")}
      </span>
    );
  }
}
