import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {serverMsg: 'Loading...'};
  }

  componentDidMount() {
    fetch('/api/')
      .then((res) => res.json())
      .then((res) => this.setState({serverMsg: res.msg}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Hello!</h1>
          <p>
            {this.state.serverMsg}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
