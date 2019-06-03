import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles = ((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(12)
  },
  card: {
    flexDirection: 'column',
    padding: theme.spacing(4)
  },
  textField: {
    margin: theme.spacing(1),
    width: 200,
  },
  button: {
    marginTop: theme.spacing(4),
  }
}));

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  handleLoginBtnClick() {
    this.props.onLogin(this.state.username, this.state.password);
  }

  handleUsernameChange(text) {
    this.setState({username: text});
  }

  handlePasswordChange(text) {
    this.setState({password: text});
  }

  render() {
    const { classes } = this.props;

    return (
      <Container className={classes.root}>
        <Grid container justify="center" alignItems="center">
          <Card className={classes.card}>
            <Grid container direction="column" justify="center" alignItems="center">
              <TextField
                label="Username"
                className={classes.textField}
                value={this.state.username}
                onChange={(event) => this.handleUsernameChange(event.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                className={classes.textField}
                value={this.state.password}
                onChange={(event) => this.handlePasswordChange(event.target.value)}
              />
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={() => this.handleLoginBtnClick()}
              >
                Login
              </Button>
            </Grid>
          </Card>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(LoginScreen);
