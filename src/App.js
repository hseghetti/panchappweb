import React, { Component } from 'react';
import * as firebase from 'firebase'
import './App.css';

import ButtonAppBar from './components/ButtonAppBar';
import firebaseConnectionHandler from './app-config/firebase-connection-handler';
import _ from 'lodash';
import PanchoListPage from './components/PanchoListPage';
import PanchoAddPage from './components/PanchoAddPage';

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConnectionHandler);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      panchos: [],
      pageToRender: 'panchoListPage'
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
          <ButtonAppBar {...this.getAppBarProps()} />
        </header>
        <div className="App-container">
          {this.renderPage()}
        </div>
      </div>
    );
  }

  renderPage = () => {
    let pageToRender = {
      panchoListPage: this.renderPachoListPage,
      panchoAddPage: this.renderPachoAddPage
    };

    return pageToRender[this.state.pageToRender]();
  }

  renderPachoListPage = () => {
    return <PanchoListPage panchos={this.state.panchos} />;
  }

  renderPachoAddPage = () => {
    return <PanchoAddPage panchos={this.state.panchos} />;
  }

  getAppBarProps = () => {
    return {
      title: 'PanchApp',
      onLoginAction: this.loginActionCallback,
      onMenuAction: this.menuActionCallback
    };
  }

  menuActionCallback = (page) => {
    console.log('adadasd ', page)
    this.setState({
      pageToRender: page
    });
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
