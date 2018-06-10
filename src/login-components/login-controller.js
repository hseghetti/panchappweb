import firebase from 'firebase';

var provider = new firebase.auth.GoogleAuthProvider();

export default {
    login: function (cb) {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            let data = {
                user: user,
                token: token
            };
    
            cb(data, '');
          }).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // The email of the user's account used.
            let email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            let credential = error.credential;
            let errorData = {
                code: errorCode,
                message: errorMessage,
                credential: credential
            };
    
            cb('', errorData);
          });
    },
    logout: function (cb) {
        firebase.auth().signOut().then(function() {
            cb();
          }).catch(function(error) {
            cb(error);
          });
    },
    getLoggedInUserData: function (cb) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                cb(user);
            } else {
              cb()
            }
          }
        );
    }
}; 
