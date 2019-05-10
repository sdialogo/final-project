import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavDrawer from "./components/navDrawer";
import Home from "./components/home";
import DevPlanViewPage from "./components/devPlan/view";
import AddDevPlan from "./components/devPlan/add";
import EmployeeViewPage from "./components/employee/view";
import AddEmployee from "./components/employee/add";
import configureStore from "./redux/configureStore";
import { Provider } from "react-redux";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <NavDrawer
        header="Final Project"
        menuList={
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/devplans" component={DevPlanViewPage} />
            <Route exact path="/employees" component={EmployeeViewPage} />
            <Route exact path="/addDevPlan" component={AddDevPlan} />
            <Route exact path="/addEmployee" component={AddEmployee} />
          </Switch>
        }
      />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
