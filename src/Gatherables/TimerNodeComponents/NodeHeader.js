import React from "react";
import Countdown from "./Countdown";

/**
 * A Component function for displaying a NodeHeader
 *
 * @param {{location:{map:string,x:number,y:number}, className:string, timeWhenNextSpawn:number, nodeUpdated:function, onClick:function}}
 */
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
