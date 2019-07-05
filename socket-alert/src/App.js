import React, { Component } from 'react';
import './App.css';
import { subscribeToAlert } from './api';

class App extends Component {
  constructor(props) {
    super(props);
    subscribeToAlert(
      (msg) => this.setState({msg})
    )
  }

  state = {
    msg: 'no message yet'
  };

  render() {
    return (
      <div className="App">
        <p>
          This is the message: {this.state.msg}
        </p>
      </div>
    );
  }
}

export default App;
