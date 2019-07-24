import React, { Component } from 'react';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css"
import Say from 'react-say';
import './App.css';
import { subscribeToAlert } from './api';

class App extends Component {
  constructor(props) {
    super(props);
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
    subscribeToAlert(
      (msg) => this.alertMain(msg)
    )
  }

  state = {
    msg: '',
  };

  alertMain(msg) {
    this.setState({msg:msg})
    this.addNotification(msg)
  }

  addNotification(msg) {
    this.notificationDOMRef.current.addNotification({
      title: "Danger",
      message: msg,
      type: "danger",
      insert: "top-right",
      container: "top-right",
      animationIn: ["animated", "bounceIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 10000 },
      dismissable: { click: true }
    });
  }

  render() {
    return (
      <div className="App">
        <p>Voice Alert Sample</p>
        <ReactNotification ref={this.notificationDOMRef} />
        <Say 
          speak={this.state.msg}
          voice={ voices => [].find.call(voices, v => v.lang === 'ja-JP') }
          // voice={ voices => [].find.call(voices, v => v.lang === 'en-IN') }
          // voice={ voices => [].find.call(voices, v => v.lang === 'en-AU') }
        />
      </div>
    );
  }
}

export default App;
