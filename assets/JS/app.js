// Initialize Firebase
var config = {
    apiKey: "AIzaSyBZ0iMv0Hx9pGRLonPfJ3c4DAKZIBLoiZk",
    authDomain: "expensee-1bf50.firebaseapp.com",
    databaseURL: "https://expensee-1bf50.firebaseio.com",
    projectId: "expensee-1bf50",
    storageBucket: "expensee-1bf50.appspot.com",
    messagingSenderId: "111814420112"
};
firebase.initializeApp(config);


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
    
        alert("success");
        
}, function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    console.log(errorCode);

});

    // [END createwithemail]
}
function toggleSignOut() {


if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
alert(".....................");     
       location.href = "index.html";

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
    alert("!!!!!!!!!!!!!!!!!!!!");     

       location.href = "logout.html";
        
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
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authwithemail]
      }
      document.getElementById('quickstart-sign-in').disabled = true;
    }


