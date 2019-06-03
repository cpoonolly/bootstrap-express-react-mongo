import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const styles = ((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

class AppNav extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {this.props.isLoggedIn && (<Button color="inherit" onClick={() => this.props.onLogout()}>Logout</Button>)}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(AppNav);

