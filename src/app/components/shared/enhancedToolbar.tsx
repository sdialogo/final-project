import * as React from "react";
import { Grid, Button, InputBase, IconButton } from "@material-ui/core";
import { Add, Close } from "@material-ui/icons";

type TProps = {
  title: string;
  redirectToAddPage: any;
  dataFilter: any;
  clearSearch: any;
  searchInput?: string;
};

type TState = {
  isSearch: boolean;
};

type TStyles = {
  title: string;
  buttonStyle: string;
  searchField: string;
};

const styles: TStyles = require("../../styles/styles.less");

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
    const { redirectToAddPage, dataFilter, title, searchInput } = this.props;
    const { isSearch } = this.state;
    return (
      <div>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <h2 className={styles.title}>{title}</h2>
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              spacing={16}
              alignItems="center"
              direction="row"
              justify="flex-end"
            >
              <Grid item hidden={isSearch ? true : false}>
                <Button
                  variant="contained"
                  className={styles.buttonStyle}
                  onClick={this.handleOnClick}
                >
                  Search
                </Button>
              </Grid>
              <Grid item hidden={!isSearch ? true : false}>
                <InputBase
                  placeholder="Search"
                  value={isSearch ? searchInput : ""}
                  className={styles.searchField}
                  onChange={dataFilter}
                />
                <IconButton aria-label="Search" onClick={this.handleExit}>
                  <Close />
                </IconButton>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  className={styles.buttonStyle}
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
