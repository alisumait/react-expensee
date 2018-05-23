import React, { Component } from 'react';
import firebase, {auth, facebookProvider, googleProvider, twitterProvider} from '../firebase.js';
import {
    Link,
    NavLink,
    Redirect,
    Prompt
} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import '../assets/css/style.css';
import Typed from 'react-typed'
import calculator from '../assets/img/icons/calculator.png';
import checklist from '../assets/img/icons/checklist.png';
import invoice from '../assets/img/icons/invoice.png';
import receipt from '../assets/img/icons/receipt.png';
import wallet from '../assets/img/icons/wallet.png';

class How extends Component {

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
                    }
                })m,  
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
    



// this is what I have convert line by Line and can you make sure about them 


React.createElement(
    "div",
    { "class": "row list" },
    React.createElement("div", { "class": "col-sm-2" }),
    React.createElement(
        "div",
        { "class": "col-sm-8 col-12" },
        React.createElement(
            "h2",
            null,
            "How it Works?"
        ),
        React.createElement(
            "dl",
            null,
            React.createElement(
                "dt",
                null,
                "Accounts:"
            ),
            React.createElement(
                "dd",
                null,
                "First, to get an access an account,\xA0you have to has to register first with e-mail address and create a password - If you have facebook, twitter, or google account, you can also access the site using these."
            ),
            React.createElement(
                "dt",
                null,
                "What Can You Do:"
            ),
            React.createElement(
                "dd",
                null,
                React.createElement(
                    "ul",
                    { style: "padding-left: 40px; margin-top: 16px" },
                    React.createElement(
                        "li",
                        null,
                        "Organize your expenses."
                    ),
                    React.createElement(
                        "li",
                        null,
                        "Achieve your financial goals."
                    ),
                    React.createElement(
                        "li",
                        null,
                        "Keep your expenses records safely."
                    )
                )
            ),
            React.createElement(
                "dt",
                null,
                "Security:"
            ),
            React.createElement(
                "dd",
                null,
                "Your security is our concern. Your personal information will secure in our site - No unauthorised access. - If wrong password given three times in a row,account will be locked.To acces site again we will give authenticaton code in your mail."
            ),
            React.createElement(
                "dt",
                null,
                "Features:"
            ),
            React.createElement(
                "dd",
                null,
                "You can add your expenses everyday and view how much you've spent anytime.",
                React.createElement(
                    "p",
                    null,
                    "At the end of the month, you can automatically convert the month's expenses into a categorized chart so you manage your money better."
                )
            ),
            React.createElement(
                "dt",
                null,
                "How We Reward:"
            ),
            React.createElement(
                "dd",
                null,
                "We don't return our customers with empty hands - Every month we reward our customers with points based on usages - The top scorer gets gifts, vouchers, and some free packages from our team"
            )
        )
    ),
    React.createElement("div", { "class": "col-sm-2" })
);













// this is for index page I thought tit might be used in HOW page 

    
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
              
<!--Footer -->
                        
        <footer className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-3 col-12">
                <ul style={{listStyle: 'none'}} className="contact">
                    <h4>Expensee</h4>
                    <hr></hr>
                    <li>128, Jalan Genting Klang,</li>
                    <li>53300 Kuala Lumpur, Malaysia</li>
                    <li><a href="mailto:expenseeapp@gmail.com">expenseeapp@gmail.com</a></li>
                    <li>+60175562049</li>

                </ul>
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-2 col-12">
                <ul style={{listStyle: 'none'}}>
                    <h4>About Us</h4>
                    <hr></hr>
                    <li><a href="pages/team.html">Our Team</a></li>
                    <li><a href="pages/how.html">How it Works?</a></li>
                    <li><a href="pages/faq.html">FAQs</a></li>
                </ul>
            </div>
            <div className="col-lg-2 col-12">
                <ul style={{listStyle: 'none'}}>
                    <h4>Social</h4>
                    <hr></hr>
                    <li><a href="https://www.twitter.com/expenseeapp">Twitter</a></li>
                    <li><a href="https://www.facebook.com/ali.app.353">Facebook</a></li>
                    <li><a href="pages/contact.html">Get in Touch</a></li>
                </ul>
            </div>
            <div className="col-lg-2"></div>
        </footer>
                    </div>
            )
        }
    }

export default Index;