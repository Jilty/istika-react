import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LogIn from "../layout/login";
import Dashboard from "../layout/dashboard";
import Project from "../layout/project";
//import AzureResouceCreation from "../layout/azureResources";
import Accessmanagement from "../layout/accessManagement";
import Templates from "../layout/templates";
function requireAuth(nextState,
  replace) {
  console.log("heyewe");
  if (!this.authenticated()) {
    console.log("hey");
    replace('/');
  }// pseudocode - SYNCHRONOUS function (cannot be async without extra callback parameter to this function)

}
function Routing() {
  return (
    <BrowserRouter>
      <div className="routes">
        <Route exact path="/" component={LogIn} />
        <Route exact path="/dashboard" component={Dashboard} onEnter={requireAuth} />
        <Route exact path="/projectDetails/:id" component={Project} onEnter={requireAuth} />
        {/* //<Route exact path="/create-resource" component={AzureResouceCreation} onEnter={requireAuth} /> */}
        <Route exact path="/settings" component={Accessmanagement} onEnter={requireAuth} />
        <Route exact path="/templates" component={Templates} onEnter={requireAuth} />

      </div>
    </BrowserRouter>
  );
}

export default Routing;
