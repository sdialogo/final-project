import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavDrawer from "./components/NavDrawer";
import Home from "./components/Home";
import DevPlanViewPage from "./components/DevPlan/DevPlanViewPage";
import EmployeeViewPage from "./components/Employee/EmployeeViewPage";
import AddDevPlan from "./components/DevPlan/AddDevPlan";
import AddEmployee from "./components/Employee/AddEmployee";
import configureStore from "./redux/configureStore";
import { Provider } from "react-redux";

const store = configureStore({});

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
