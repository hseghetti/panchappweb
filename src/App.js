import React, { Component } from 'react';
import * as firebase from 'firebase'
import './App.css';

import InteractiveList from './components/InteractiveList';
import ButtonAppBar from './components/ButtonAppBar';
//import firebaseConnectionHandler from './app-config/firebase-connection-handler';
import _ from 'lodash';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDtz51NeQQVzOHR-MqKfV4HCsZxURbNS-M",
  authDomain: "panchos-4ad41.firebaseapp.com",
  databaseURL: "https://panchos-4ad41.firebaseio.com",
  projectId: "panchos-4ad41",
  storageBucket: "panchos-4ad41.appspot.com",
  messagingSenderId: "357706798263"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      panchos: []
    };

    this.panchosRef = firebaseApp.database().ref('/panchos/');
  }

  componentDidMount() {
    this.listenForPanchodAdded(this.panchosRef);
  }

  componentWillUnmount () {
      this.panchosRef.off();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ButtonAppBar title="PanchApp List" onLoginAction={this.loginActionCallback} />
        </header>
        <div className="App-container">
          <InteractiveList panchos={this.state.panchos} />
        </div>
      </div>
    );
  }

  listenForPanchodAdded = (panchosRef = this.panchosRef) => {

    panchosRef.orderByKey().on('value', (dataSnapshot) => {
        let items = [];
        dataSnapshot.forEach((child) => {      
            items.push({
                date: child.val().date,
                panchado: child.val().panchado,
                reason: child.val().reason,
                _key: child.key
            });
        });

        this.setState({
            panchos: items
        });
    });
  };

getPanchos = () => {
    let panchos = {};

    if (_.isEmpty(this.state.panchos)) {
        this.listenForPanchodAdded(this.panchosRef);
    } else {
       panchos = this.state.panchos;
    }

    return panchos;
  };

  loginActionCallback = (userData) => {
    if (userData) {
      this.listenForPanchodAdded();
    } else {
      this.setState({
        panchos: []
      });
    }
  };
}

export default App;
