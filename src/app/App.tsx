import * as React from "react";
import * as ReactDOM from "react-dom";
import NavBar from "./components/Nav";
import ViewPage from "./components/ViewPage";

ReactDOM.render(
  <div>
    {/* <Hello compiler="Typescript" framework="React" bundler="Webpack" /> */}
    <NavBar header="Development Plans" />
    <ViewPage />
  </div>,
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
