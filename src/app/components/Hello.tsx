import * as React from "react";

type TProps = {
  compiler: string;
  framework: string;
  bundler: string;
};

export class Hello extends React.Component<TProps, {}> {
  render() {
    return (
      <h1>
        This is a {this.props.framework} application using {this.props.compiler}{" "}
        with {this.props.bundler}
      </h1>
    );
  }
}
