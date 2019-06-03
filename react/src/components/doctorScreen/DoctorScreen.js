import React from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const styles = ((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(4),
    overflowX: 'auto',
  },
  searchIcon: {
    margin: theme.spacing(2),
  },
  table: {
    marginTop: theme.spacing(2),
    minWidth: 650,
  }
}));

class DoctorScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      patients: []
    };
  }

  componentDidMount() {
    axios.get('/api/patients')
      .then((res) => res.data)
      .then((res) => this.setState({patients: res.patients}));
  }

  handleSearchInputChange(val) {
    this.setState({search: val});
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <TextField
          label="Search"
          value={this.state.search}
          onChange={(event) => this.handleSearchInputChange(event.target.value)}
        />
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Patient Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Adress</TableCell>
              <TableCell align="right">Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.patients
              .filter(row => row.name.startsWith(this.state.search))
              .map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">{row.name}</TableCell>
                  <TableCell align="right">{row.age}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.address}</TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(DoctorScreen);
