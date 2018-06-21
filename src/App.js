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
    this.usersRef = firebaseApp.database().ref('/users/');
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
    const pages = {
      default: this.renderPachoListPage,
      panchoListPage: this.renderPachoListPage,
      panchoAddPage: this.renderPachoAddPage
    };
    const pageToRender = pages[this.state.pageToRender] || pages.default;

    return  pageToRender();
  }

  renderPachoListPage = () => {
    return <PanchoListPage panchos={this.state.panchos} removePancho={this.removeFromFirebase} />;
  }

  renderPachoAddPage = () => {
    return <PanchoAddPage users={this.state.users} addToFirebase={this.addToFirebase} />;
  }

  getAppBarProps = () => {
    return {
      title: 'PanchApp',
      onLoginAction: this.loginActionCallback,
      onMenuAction: this.menuActionCallback
    };
  }

  menuActionCallback = (page) => {
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
        }, this.loadUsersList);
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
        panchos: [],
        users: []
      });
    }
  };

  loadUsersList = () => {
    const user = firebase.auth().currentUser;
        let newUserRef;
        this.usersRef.orderByChild('email').equalTo(user.email).on("value", function(snapshot) {
            if (!snapshot.val()) {
                newUserRef = this.usersRef.push({email: user.email, name: user.displayName}, (error) => {
                    if (error) {
                        console.log('user push failed ', error);
                    } else {
                        this.setUsersList(newUserRef);
                    }
                })
            } else {
                this.setUsersList(snapshot);
            }
        }.bind(this));
  };

  setUsersList = (userData) => {
    this.usersRef.orderByChild('email').on("value", function(dataSnapshot) {
        let items = [];
        
        dataSnapshot.forEach((child) => {      
            items.push({
                email: child.val().email,
                name: child.val().name,
                _key: child.key
            });
        })
        
        this.setState({
            users: items,
            userData: userData
        });
    }.bind(this));        
  }

  addToFirebase = (pancho) => {
    this.panchosRef.push(pancho);
  }

  removeFromFirebase = (key) => {
    this.panchosRef.child(key).remove();
  }
}

export default App;
