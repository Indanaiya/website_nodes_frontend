import React from "react";
import Countdown from "../Countdown";

export default function NodeHeader({
  location,
  className,
  timeWhenNextSpawn,
  nodeUpdated,
  onClick,
}) {
  return (
    <header onClick={onClick}>
      <span className="location">
        {location.map}
        <br />({location.x}, {location.y})
      </span>
      <span className={"timer " + className}>
        <Countdown
          targetTime={timeWhenNextSpawn}
          countdownComplete={nodeUpdated}
        />
      </span>
    </header>
  );
}
