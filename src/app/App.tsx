import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavDrawer from "./components/NavDrawer";
import Hello from "./components/Hello";
import DevPlan from "./components/DevPlan";
import Employee from "./components/Employee";

ReactDOM.render(
  <BrowserRouter>
    <NavDrawer
      header="Final Project"
      menuList={
        <Switch>
          <Route exact path="/" component={Hello} />
          <Route exact path="/devplans" component={DevPlan} />
          <Route exact path="/employees" component={Employee} />
        </Switch>
      }
    />
  </BrowserRouter>,
  document.getElementById("root")
);

// const Main = <div>
//     <NavBar header="Development Plans" />
//     <ViewPage />
//   </div>;

// ReactDOM.render(
//   <Provider>
//     {Main}
//   </Provider>,
//   document.getElementById("root")
// );
