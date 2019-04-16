import * as React from "react";
import * as ReactDOM from "react-dom";
import NavBar from "./components/Nav";

ReactDOM.render(
  <div>
    {/* <Hello compiler="Typescript" framework="React" bundler="Webpack" /> */}
    <NavBar header="Development Plans" />
  </div>,
  document.getElementById("root")
);
