import * as React from "react";
import { Grid, Button, InputBase, IconButton } from "@material-ui/core";
import { Add, Close } from "@material-ui/icons";

type TProps = {
  title: string;
  redirectToAddPage: any;
  dataFilter: any;
  clearSearch: any;
};

type TState = {
  isSearch: boolean;
};

class EnhancedToolbar extends React.Component<TProps, TState> {
  state: TState = {
    isSearch: false
  };

  handleOnClick = () => {
    this.setState({ isSearch: true });
  };

  handleExit = () => {
    this.setState({ isSearch: false });

    this.props.clearSearch(event);
  };

  render() {
    const { redirectToAddPage, dataFilter, title } = this.props;
    const { isSearch } = this.state;
    return (
      <div>
        <Grid container alignItems="center" style={{ flexGrow: 1 }}>
          <Grid item xs={6}>
            <h2 style={{ marginLeft: "25px", color: "rgba(73,155,234,1)" }}>
              {title}
            </h2>
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              spacing={16}
              alignItems="center"
              direction="row"
              justify="flex-end"
              style={{ height: 80 }}
            >
              <Grid item hidden={isSearch ? true : false}>
                <Button
                  variant="contained"
                  style={{ background: "rgba(73,155,234,1)", color: "white" }}
                  onClick={this.handleOnClick}
                >
                  Search
                </Button>
              </Grid>
              <Grid item hidden={!isSearch ? true : false}>
                <InputBase
                  placeholder="Search"
                  style={{ background: "#dce2ea", padding: "2px 4px" }}
                  onChange={dataFilter}
                />
                <IconButton aria-label="Search" onClick={this.handleExit}>
                  <Close />
                </IconButton>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  style={{ background: "rgba(73,155,234,1)", color: "white" }}
                  onClick={redirectToAddPage}
                >
                  Add
                  <Add />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default EnhancedToolbar;
