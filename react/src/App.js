import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  static foo = 1;

  constructor(props) {
    super(props);

    this.state = {
      serverMsg: 'Loading...'
    };
  }

  componentDidMount() {
    axios.get('/api')
      .then((res) => res.data)
      .then((res) => this.setState({serverMsg: res.msg}));
  }

  handleDoctorLoginBtn() {
    axios.post('/api/login', {username: 'doctor1', password: 'password1'})
      .then((res) => this.setState({serverMsg: res.msg}));
  }

  handlePatientLoginBtn() {
    axios.post('/api/login', {username: 'patient1', password: 'password1'})
      .then(() => axios.get('/api'))
      .then((res) => res.data)
      .then((res) => this.setState({serverMsg: res.msg}));
  }

  handleGetPatients() {
    axios.get('/api/patients')
      .then((res) => res.data)
      .then((res) => this.setState({serverMsg: `Patients: ${res.patients.join(', ')}`}));
  }

  handleUpdatePatientAge() {
    axios.put('/api/patient', {age: this.foo++})
      .then((res) => res.data)
      .then((res) => this.setState({serverMsg: `Patient: ${JSON.stringify(res.patient_detail)}`}));
  }

  handleLogoutBtn() {
    axios.post('/api/logout')
      .then(() => axios.get('/api'))
      .then((res) => res.data)
      .then((res) => this.setState({serverMsg: res.msg}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{this.state.serverMsg}</p>

          <button onClick={() => this.handleDoctorLoginBtn()}>Login Doctor</button><br/>
          <button onClick={() => this.handlePatientLoginBtn()}>Login Patient</button><br/>
          <button onClick={() => this.handleGetPatients()}>Get Patients</button><br/>
          <button onClick={() => this.handleUpdatePatientAge()}>Update Patient Age</button><br/>
          <button onClick={() => this.handleLogoutBtn()}>Logout</button>
        </header>
      </div>
    );
  }
}

export default App;
