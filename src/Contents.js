import React from "react";
import { Switch, Route } from "react-router-dom";

import PhantaTable from "./Phantasmagoria/PhantaTable.js";
import Gatherables from "./Gatherables/Gatherables.js";

const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
  return (
    <Switch>
      <Route path="/phantasmagoria" component={PhantaTable} />
      <Route path="/gatherables" component={Gatherables} />
      <Route component={NotFound} />
    </Switch>
  );
}
