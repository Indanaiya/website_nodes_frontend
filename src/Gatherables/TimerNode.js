import React from "react";

import NodeHeader from "./TimerNodeComponents/NodeHeader";
import Items from "./TimerNodeComponents/Items";
import NodeDetails from "./TimerNodeComponents/NodeDetails";

/**
 * A class to represent one gathering node
 */
export default class TimerNode extends React.Component {
  constructor({ node }) {
    super();
    this.items = <Items items={node.items} />;

    this.state = {};
    this.toggleNodeDetails = this.toggleNodeDetails.bind(this);
  }

  toggleNodeDetails() {
    if (this.state.nodeDetails) {
      this.setState({ nodeDetails: null });
      return;
    }

    const {
      node: { level, name, spawnTimes },
    } = this.props;

    const nodeDetails = (
      <NodeDetails level={level} name={name} spawnTimes={spawnTimes} />
    );

    this.setState({ nodeDetails });
  }

  render() {
    const {
      node: { location },
      timeUntilNextSpawn,
      nodeUpdated,
    } = this.props;
    const { nodeDetails } = this.state;

    let className, timeUntilDespawn;
    if (timeUntilNextSpawn < 0) {
      console.log(timeUntilNextSpawn);
      className = "activeNode";
      timeUntilDespawn = -timeUntilNextSpawn;
    }
    const timeWhenNextSpawn = new Date(
      Date.now() + (timeUntilDespawn ?? timeUntilNextSpawn) * 1000
    );

    return (
      <div className="node">
        <NodeHeader
          location={location}
          className={className}
          timeWhenNextSpawn={timeWhenNextSpawn}
          nodeUpdated={nodeUpdated}
          onClick={this.toggleNodeDetails}
        />
        <div className="main">{nodeDetails ?? this.items}</div>
      </div>
    );
  }
}
