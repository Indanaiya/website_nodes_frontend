import React from "react";

import Filter from "./Filter.js";

export default class FilterBar extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  render() {
    return (
      <p>This is a placeholder filter</p>
      // <div className="filter" >
      //   <ul className="horizontal">
      //     <li>
      //       Patches
      //       <ul>
      //         <li>2.0</li>
      //         <li>3.0</li>
      //         <li>4.0</li>
      //         <li>5.0</li>
      //       </ul>
      //     </li>
      //   </ul>
      //   <ul className="horizontal">
      //     <li>
      //       Classes
      //       <ul>
      //         <li>MIN</li>
      //         <li>BTN</li>
      //         <li>FSH</li>
      //       </ul>
      //     </li>
      //   </ul>
      // </div>
    );
  }
}
