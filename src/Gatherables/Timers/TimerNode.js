import React from "react";

import NodeHeader from "./NodeHeader";
import Items from "./Items";
import NodeDetails from "./NodeDetails";

/**
 * A Component class to represent one gathering node
 */
export default class TimerNode extends React.Component {
  constructor({ node, timeUntilNextSpawn }) {
    super();
    this.items = <Items items={node.items} />;

    let timeUntilDespawn;
    if (timeUntilNextSpawn < 0) {
      console.log(timeUntilNextSpawn);
      this.className = "activeNode";
      timeUntilDespawn = -timeUntilNextSpawn;
    }
    this.timeWhenNextSpawn = new Date(
      Date.now() + (timeUntilDespawn ?? timeUntilNextSpawn) * 1000
    );

    this.state = {};
    this.toggleNodeDetails = this.toggleNodeDetails.bind(this);
  }

  /**
   * Toggle the display of nodeDetails in the node body (Default display is this.items)
   */
  toggleNodeDetails() {
    if (this.state.nodeDetails) {
      this.setState({ nodeDetails: null });
    }else{
      const {
        node: { level, name, spawnTimes },
      } = this.props;
      const nodeDetails = (
        <NodeDetails level={level} name={name} spawnTimes={spawnTimes} />
      );
  
      this.setState({ nodeDetails });
    }
  }

  render() {
    const {
      node: { location },
      nodeUpdated,
    } = this.props;
    const { nodeDetails } = this.state;

    return (
      <div className="node">
        <NodeHeader
          location={location}
          className={this.className}
          timeWhenNextSpawn={this.timeWhenNextSpawn}
          nodeUpdated={nodeUpdated}
          onClick={this.toggleNodeDetails}
        />
        <div className="nodeBody">{nodeDetails ?? this.items}</div>
      </div>
    );
  }
}
