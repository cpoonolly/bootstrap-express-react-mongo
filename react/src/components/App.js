import React from 'react';
import axios from 'axios';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/purple';

import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';

import AppNav from './appNav/AppNav';
import LoginScreen from './loginScreen/LoginScreen';
import DoctorScreen from './doctorScreen/DoctorScreen'
import PatientScreen from './patientScreen/PatientScreen';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: purple
  },
});

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      isDoctor: false,
      isPatient: false,
      errorMsg: null
    };
  }

  componentDidMount() {
    axios.get('/api/session')
      .then((res) => res.data)
      .then((res) => this.setState({
        isLoggedIn: res.is_logged_in || false,
        isDoctor: res.is_doctor || false,
        isPatient: res.is_patient || false
      }));
  }

  handleLogin(username, password) {
    axios.post('/api/login', {username: username, password: password})
      .then((res) => res.data)
      .then((res) => this.setState({
        isLoggedIn: res.is_logged_in,
        isDoctor: res.is_doctor,
        isPatient: res.is_patient
      }))
      .catch((err) => {
        this.setState({errorMsg: 'Failed to Login'});
      });
  }

  handleLogout() {
    axios.post('/api/logout')
      .then((res) => res.data)
      .then((res) => this.setState({
        isLoggedIn: false,
        isDoctor: false,
        isPatient: false
      }))
      .catch((err) => {
        this.setState({errorMsg: 'Failed to Logout'});
      });
  }

  render() {
    return (
      <CssBaseline>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <AppNav isLoggedIn={this.state.isLoggedIn} onLogout={() => this.handleLogout()}></AppNav>
            {!this.state.isLoggedIn && <LoginScreen onLogin={(uname, pwd) => this.handleLogin(uname, pwd)}></LoginScreen>}
            {this.state.isLoggedIn && this.state.isDoctor && <DoctorScreen></DoctorScreen>}
            {this.state.isLoggedIn && this.state.isPatient && <PatientScreen></PatientScreen>}
          </div>
          <Snackbar
            open={this.state.errorMsg !== null}
            autoHideDuration={6000}
            onClose={() => this.setState({errorMsg: null})}
            message={this.state.errorMsg}
          />
        </MuiThemeProvider>
      </CssBaseline>
    );
  }
}

export default App;
