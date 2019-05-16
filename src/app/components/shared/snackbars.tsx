import * as React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

type TProps = {
  message: string;
  variant: string;
  onClose?: any;
};

type TState = {
  open: boolean;
};

type TStyles = {
  success: string;
  error: string;
  snackbar: string;
};

const styles: TStyles = require("../../styles/styles.less");

class CustomizedSnackbars extends React.Component<TProps, TState> {
  state: TState = {
    open: true
  };

  handleClick = () => {
    this.setState({ open: false });

    this.props.onClose(event);
  };

  render() {
    const { open } = this.state;
    const { message, variant } = this.props;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={open}
          autoHideDuration={2000}
          className={styles.snackbar}
        >
          {variant === "success" && (
            <SnackbarContent
              className={styles.success}
              message={message}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={this.handleClick}
                >
                  <CheckCircleIcon />
                </IconButton>
              ]}
            />
          )}
        </Snackbar>
      </div>
    );
  }
}

export default CustomizedSnackbars;
