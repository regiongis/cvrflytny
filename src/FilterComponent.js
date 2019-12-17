import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class FilterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // open: false,
      // handleOpen :
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  render() {
    let { open, handleOpen } = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleOpen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary">Cancel</Button>
          <Button color="primary">Subscribe</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default FilterComponent;
