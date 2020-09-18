import React from "react";

export default function NodeDetails({level, name, spawnTimes}) {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan="2" className="nodeName">
            Level {level} {name}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Spawn Times</td>
          <td>
            {spawnTimes
              .map(
                (spawnTime) =>
                  `${String(Math.floor(spawnTime)).padStart(2, "0")}:${String(
                    spawnTime % 1
                  ).padStart(2, "0")}`
              )
              .join(", ")}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
