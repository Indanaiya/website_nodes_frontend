import React from "react";

import {
  timeUntilInEorzea,
  getEorzeaHoursDecimal,
  LENGTH_OF_EORZEAN_DAY,
} from "./eorzeaTime.js";

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
        timeUntilNextSpawn: getTimeUntilNextSpawn(this.state.node),
      });
      //console.log(this.state.timeUntilNextSpawn);
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { timeUntilNextSpawn, node } = this.state;
    return timeUntilNextSpawn < 0 ? (
      //Displays time left until node despawns
      <td className="activeNode">
        {(node.lifespan / 24) * LENGTH_OF_EORZEAN_DAY + timeUntilNextSpawn}
      </td>
    ) : (
      //Displays time left until node spawns
      <td className="inactiveNode">{timeUntilNextSpawn}</td>
    );
  }
}
