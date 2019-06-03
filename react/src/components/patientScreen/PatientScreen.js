import React from 'react';
import axios from 'axios';

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
    padding: theme.spacing(4),
    width: 600,
  },
  textField: {
    margin: theme.spacing(1),
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(4),
  }
}));

class PatientScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      age: 0,
      email: '',
      address: '',
      phone: ''
    }
  }

  componentDidMount() {
    axios.get('/api/patient')
      .then((res) => res.data)
      .then((res) => this.setState({...res.patient_details}));
  }

  handleFieldUpdate(fieldName, val) {
    this.setState({[fieldName]: val});
  }

  handleUpdateBtnClick() {
    axios.put('/api/patient', this.state)
      .then((res) => res.data)
      .then((res) => this.setState({...res.patient_details}));
  }

  render() {
    const { classes } = this.props;

    return (
      <Container className={classes.root}>
        <Grid container justify="center" alignItems="center">
          <Card className={classes.card}>
            <Grid container direction="column" justify="center" alignItems="center">
              <TextField
                label="Name"
                className={classes.textField}
                value={this.state.name}
                onChange={(event) => this.handleFieldUpdate('name', event.target.value)}
              />
              <TextField
                label="Age"
                className={classes.textField}
                type="password"
                type="number"
                value={this.state.age}
                onChange={(event) => this.handleFieldUpdate('age', event.target.value)}
              />
              <TextField
                label="Email"
                className={classes.textField}
                value={this.state.email}
                onChange={(event) => this.handleFieldUpdate('email', event.target.value)}
              />
              <TextField
                label="Address"
                className={classes.textField}
                value={this.state.address}
                onChange={(event) => this.handleFieldUpdate('address', event.target.value)}
              />
              <TextField
                label="Phone"
                className={classes.textField}
                value={this.state.phone}
                onChange={(event) => this.handleFieldUpdate('phone', event.target.value)}
              />
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={() => this.handleUpdateBtnClick()}
              >
                Update
              </Button>
            </Grid>
          </Card>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(PatientScreen);
