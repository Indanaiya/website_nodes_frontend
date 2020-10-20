import React from "react";

export default function ScripDetails({ item, scrips, removeDetails }) {
  if (scrips !== "yellowScrips" && scrips !== "whiteScrips") {
    throw new Error("Illegal Argument for ScripDetails: " + scrips);
  }

  return (
    <table className="details">
      <thead>
        <tr>
          <th colSpan="2">
            <div>
              <button
                type="button"
                className="clickable"
                onClick={removeDetails}
              >
                &#5130;
              </button>
              <span>{`${
                scrips === "whiteScrips" ? "White" : "Yellow"
              } Scrips (${item.name})`}</span>
            </div>
          </th>
        </tr>
        <tr>
          <th>Collectability</th>
          <th>Reward</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{item.task[scrips].HighCollectability}+</td>
          <td>{item.task[scrips].HighReward}</td>
        </tr>
        <tr>
          <td>{item.task[scrips].MidCollectability}-{item.task[scrips].HighCollectability-1}</td>
          <td>{item.task[scrips].MidReward}</td>
        </tr>
        <tr>
          <td>{item.task[scrips].LowCollectability}-{item.task[scrips].MidCollectability-1}</td>
          <td>{item.task[scrips].LowReward}</td>
        </tr>
      </tbody>
    </table>
  );
}
