import React, { Component } from 'react';
import firebase, {auth, facebookProvider, googleProvider, twitterProvider} from '../firebase.js';
import {
    Link,
    Redirect
} from 'react-router-dom';
import '../assets/css/style.css';

class IndexHeader extends Component {

    constructor(props) {
        super(props);
      this.toggleSignIn = this.toggleSignIn.bind(this);
        this.displayblocks = this.displayblocks.bind(this);
        this.displayblockw = this.displayblockw.bind(this);
        this.twitterLogin = this.twitterLogin.bind(this);
        this.facebookLogin = this.facebookLogin.bind(this);
        this.googleLogin = this.googleLogin.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.state = {
            displaysignin: false,
            displaysignup: false,
            created: false,
            logged: false
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    displayblocks(e) {
        this.setState({
            displaysignin: !this.state.displaysignin
        });
    }
    displayblockw(e) {
        this.setState({
            displaysignup: !this.state.displaysignup
        });
    }


    handleClickOutside(event) {
        var signup = document.getElementById('sign-wrapper');
        var signin = document.getElementById('sign-in');
        if (signin == event.target) {
            this.setState({
                displaysignin: !this.state.displaysignin
            });
        }
        if (signup == event.target) {
            this.setState({
                displaysignup: !this.state.displaysignup
            });
        }
    }




    toggleSignIn() {
        var getUser = this.props.getUser;
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
        auth.signInWithEmailAndPassword(email, password).then((user) => {
            var user = firebase.auth().currentUser;

            getUser(user.uid);
            this.setState({ logged: true });

        }, function (error) {
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

    googleLogin() {
        var getUser = this.props.getUser;

        auth.signInWithPopup(googleProvider)
            .then((result) => {
                var user = firebase.auth().currentUser;
                var that = this;
                var database = firebase.database().ref().child('users');
                database.once('value', function(snap){
                    if(snap.hasChild(user.uid)){
                    getUser(user.uid);
                    that.setState({ logged: true });   
                    }
                    else{
                    database.child(user.uid).set({
                        user: user.email,
                        amount: 0
                    });
                        getUser(user.uid);
                    that.setState({ logged: true });
                    }
                })
            });
    }

    facebookLogin() {
        var getUser = this.props.getUser;

        auth.signInWithPopup(facebookProvider)
            .then((result) => {
                var user = firebase.auth().currentUser;
                var that = this;
                var database = firebase.database().ref().child('users');
                database.once('value', function(snap){
                    if(snap.hasChild(user.uid)){
                    getUser(user.uid);
                    that.setState({ logged: true });   
                    }
                    else{
                    database.child(user.uid).set({
                        user: user.email,
                        amount: 0
                    });
                        getUser(user.uid);
                    that.setState({ logged: true });
                    }
                })
            });
    }

    twitterLogin() {
        var getUser = this.props.getUser;

        auth.signInWithPopup(twitterProvider)
            .then((result) => {
            var user = firebase.auth().currentUser;
            var that = this;
            var database = firebase.database().ref().child('users');               database.once('value', function(snap){
                    if(snap.hasChild(user.uid)){
                    getUser(user.uid);
                    that.setState({ logged: true });   
                    }
                    else{
                    database.child(user.uid).set({
                        user: user.email,
                        amount: 0
                    });
                        getUser(user.uid);
                    that.setState({ logged: true });
                    }
                })
            });
    }

    handleSignUp() {
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
        auth.createUserWithEmailAndPassword(email, password).then((user) => {
            var user = firebase.auth().currentUser;

            var database = firebase.database().ref().child('users');
            database.child(user.uid).set({
                user: user.email,
                amount: 0
            });
            
            this.setState({ created: true });

        }, function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            console.log(errorCode);

        });

}
    
    render() {
            if(this.state.created){
                return <Redirect to="/success"></Redirect>
            }
            if(this.state.logged){
                return <Redirect to="/mainpage"></Redirect>
            }
            return ( <div>
                    <div id="sign-wrapper" style={{display: this.state.displaysignup ? 'block' : 'none'}} className="back">
            <div className="login-box animate">
                <div className="row center">
                    <div className="col-md-5 col-12 left">
                        <h1>Sign up</h1>


                        <input type="text" name="email" placeholder="E-mail" id="email" />
                        <input type="password" name="password" placeholder="Password" id="password" />
                        <input type="password" name="password2" placeholder="Retype password" id="repassword" />

                        <input type="submit" name="signup_submit" value="Sign me up" onClick={() => this.handleSignUp()} />
                    </div>
                    <div className="col-md-2 col-12">

                        <div className="or">OR</div>
                    </div>
                    <div className="col-md-5 col-12 right">

                        <button className="social-signin facebook" onClick={() => this.facebookLogin()}>Log in with facebook</button>
                        <button className="social-signin twitter" onClick={() => this.twitterLogin()}>Log in with Twitter</button>
                        <button className="social-signin google" onClick={() => this.googleLogin()}>Log in with Google</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="sign-in" style={{display: this.state.displaysignin ? 'block' : 'none'}} className="back">
            <div className="login-box animate">
                <div className="row center">
                    <div className="col-md-5 col-12 left">
                        <h1>Sign in</h1>


                        <input type="text" id="signinemail" name="email" placeholder="Email" />
                        <input type="password" id="signinpassword" name="password" placeholder="Password" />


                        <input type="submit" name="signup_submit" value="Sign me in" onClick={() => this.toggleSignIn()} />
                    </div>
                    <div className="col-md-2 col-12">

                        <div className="or">OR</div>
                    </div>
                    <div className="col-md-5 col-12 right">

                        <button className="social-signin facebook" onClick={() => this.facebookLogin()}>Log in with facebook</button>
                        <button className="social-signin twitter" onClick={() => this.twitterLogin()}>Log in with Twitter</button>
                        <button className="social-signin google" onClick={() => this.googleLogin()}>Log in with Google</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col"></div>
            <div className="col-md-8 col-sm-10 col-12">

                <header>
                    <Link className="logo" to="/">expensee<p className="dot">.</p></Link>
                    <a className="sign" onClick={this.displayblocks} style={{float: 'right'}}>Sign in</a>
                    <a className="sign" onClick={this.displayblockw} style={{float: 'right'}}>Join Us</a>

                </header>

            </div>
            <div className="col"></div>

        </div>
                    </div>
            )
         }
    }

export default IndexHeader;