const items = document.querySelectorAll(".accordion a");

function toggleAccordion(){
  this.classList.toggle('active');
  this.nextElementSibling.classList.toggle('active');
}

items.forEach(item => item.addEventListener('click', toggleAccordion));



var config = {
    apiKey: "AIzaSyBZ0iMv0Hx9pGRLonPfJ3c4DAKZIBLoiZk",
    authDomain: "expensee-1bf50.firebaseapp.com",
    databaseURL: "https://expensee-1bf50.firebaseio.com",
    projectId: "expensee-1bf50",
    storageBucket: "expensee-1bf50.appspot.com",
    messagingSenderId: "111814420112"
};
firebase.initializeApp(config);
this.database = firebase.database().ref().child('users');


function handleSignUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var repassword = document.getElementById('repassword').value;
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }
    if (password != repassword) {
        alert("Try Again");
        return;
    }

    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
        
        
    var user = firebase.auth().currentUser;
        
    this.database.push().set({userEmail: user.email});
        
       location.href="pages/thank.html";
        
}, function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    console.log(errorCode);

});

    // [END createwithemail]
}

function toggleSignOut() {

if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
       location.href = "../index.html";
}
 } 
 

function toggleSignIn() {
      var email = document.getElementById('signinemail').value;
        var password = document.getElementById('signinpassword').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
    var user = firebase.auth().currentUser;
            
       location.href = "pages/main.html";
        
}, function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          console.log(errorCode);
          console.log(errorMessage);
          // [END_EXCLUDE]
        });
        // [END authwithemail]
      }
 function signinfacebook(){

var provider = new firebase.auth.FacebookAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}, function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

}
function signingoogle(){

var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  console.log(user);
}, function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
}


function signintwitter(){

var provider = new firebase.auth.TwitterAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
  // You can use these server side with your app's credentials to access the Twitter API.
  var token = result.credential.accessToken;
  var secret = result.credential.secret;
  // The signed-in user info.
  var user = result.user;
  console.log(user);
  // ...
}, function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
}

