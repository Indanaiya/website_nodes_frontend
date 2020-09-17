import React from "react";

export default function ServerSpecifics({
  marketInfo: { saleVelocity, avgPrice, lastUploadTime },
  server,
  itemName,
  removeServerSpecifics,
}) {
  const lastUploadTimeDate = new Date(lastUploadTime);
  const lastUploadTimeString =
    lastUploadTimeDate.getUTCDate() +
    1 +
    "/" +
    (lastUploadTimeDate.getUTCMonth() + 1) +
    "/" +
    lastUploadTimeDate.getUTCFullYear();
    
  return (
    <table className="details">
      <thead>
        <tr>
          <th colSpan="2">
            <div>
              <button
                type="button"
                className="clickable"
                onClick={removeServerSpecifics}
              >
                &#5130;
              </button>
              <span>
                {itemName} ({server})
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Past Week's Sales (Overall):</td>
          <td>{saleVelocity.overall * 7}</td>
        </tr>
        <tr>
          <td>Past Week's Sales (NQ)</td>
          <td>{saleVelocity.nq * 7}</td>
        </tr>
        <tr>
          <td>Past Week's Sales (HQ)</td>
          <td>{saleVelocity.hq * 7}</td>
        </tr>
        <tr>
          <td>Average Price</td>
          <td>{avgPrice.overall.toFixed(3)}</td>
        </tr>
        <tr>
          <td>Average NQ Price</td>
          <td>{avgPrice.nq.toFixed(3)}</td>
        </tr>
        <tr>
          <td>Average HQ Price</td>
          <td>{avgPrice.hq.toFixed(3)}</td>
        </tr>
        <tr>
          <td>Most Recent Upload Time</td>
          <td>{lastUploadTimeString}</td>
        </tr>
      </tbody>
    </table>
  );
}
