//Made with help from this comment by /u/Clorifex https://www.reddit.com/r/ffxiv/comments/2pbl8p/eorzea_time_formula/cmvijkz?utm_source=share&utm_medium=web2x

/**
 * The number to multiply the unix epoch time with to get the "eorzean epoch time"
 *
 * @type {Number}
 */
const EORZEA_EPOCH_MULTIPLIER = 20.571428571428573;
export const LENGTH_OF_EORZEAN_DAY = 70 * 60; // 70 minutes

/**
 * Get the exact number of eorzean hours since the current eorzean day began
 *
 * @returns {Number} - The number of eorzean hours since the current eorzean day began
 */
export function getEorzeaHoursDecimal() {
  const localEpoch = new Date().getTime();
  const eorzeaEpoch = localEpoch * EORZEA_EPOCH_MULTIPLIER;
  const hours = (eorzeaEpoch / (1000 * 60 * 60)) % 24;
  return hours;
}

/**
 * Get the current time in Eorzea
 *
 * @returns {{hours: Number, minutes: Number}} - The amount of time in (rounded) eorzean hours and minutes since the current eorzean day began
 */
export function getEorzeaTime() {
  const localEpoch = new Date().getTime();
  const eorzeaEpoch = localEpoch * EORZEA_EPOCH_MULTIPLIER;
  const minutes = parseInt((eorzeaEpoch / (1000 * 60)) % 60);
  const hours = parseInt((eorzeaEpoch / (1000 * 60 * 60)) % 24);
  return { hours, minutes };
}

//Target time is in hours
/**
 * Get the amount of time (in the real world) until a specified time in Eorzea
 *
 * @param {number} targetTime - The desired time, in hours, in Eorzea
 * @returns {number} The amount of time, in the real world, in seconds, until the desired time in Eorzea is reached
 */
export function timeUntilInEorzea(targetTime) {
  if (targetTime < 0 || targetTime >= 24) {
    throw new RangeError(
      `targetTime must be between 0 and 24 (not inlcuding 24). It was '${targetTime}'`
    );
  }
  const eorzeaHours = getEorzeaHoursDecimal();
  let secondsUntilTarget = 0; //if neither of the ifs are met, that means the target time is right now (i.e. 0 seconds away)
  if (targetTime > eorzeaHours) {
    //targetTime is today
    secondsUntilTarget = (targetTime - eorzeaHours) * 175;
  } else if (targetTime < eorzeaHours) {
    secondsUntilTarget = (24 - eorzeaHours + targetTime) * 175;
  }
  return secondsUntilTarget;
}

/**
 * Get the amount of time, in seconds, until the supplied node spawns or, if the node is currently spawned, the number of seconds since it spawned (as a negative number)
 *
 * @param {{spawnTimes: [number], lifespan:number}} node The node that will be spawning
 * @returns {number} If positive, the time until the supplied node next spawns. If negative, the time until the node despawns (in seconds)
 */
export function getTimeUntilNextSpawn({ spawnTimes, lifespan }) {
  const eorzeaTime = getEorzeaHoursDecimal();
  for (let spawnTime of spawnTimes) {
    if (spawnTime > eorzeaTime) {
      return timeUntilInEorzea(spawnTime);
    } else if (spawnTime + lifespan > eorzeaTime) {
      let targetTime = spawnTime + lifespan;
      targetTime = targetTime >= 24 ? targetTime - 24 : targetTime;
      return -timeUntilInEorzea(targetTime);
    }
  }
  return timeUntilInEorzea(
    Math.floor(spawnTimes[0] / 100) + (spawnTimes[0] % 100)
  ); //If nothing was returned during the for loop, that means that the next spawn time will be the first one tomorrow.
}
