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

class Index extends Component {

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

        <div className="row second">
            <div className="col-lg-1"></div>
            <div className="col-lg-7 col-12 item">
                <div className="jumbo">The Easiest Way To Manage
                    <span style={{color: 'darkorange', fontWeight: 600}}> All YOUR EXPENSES.</span> In One Place!
                </div>
                <a href="#thirds" className="button">What does it do <i className="fa fa-angle-double-down arrow"></i></a>
            </div>
            <div className="col-"></div>
        </div>

        <div className="circle"></div>

        <div className="row third">
            <div className="col-12" id="thirds">
                <h2>The only app you'll need to</h2>
                <Typed 
                    className="typed1"
                    strings={["Organize Expenses.", "Achieve Financial Goals.", "Keep Records."]}
                    typeSpeed={80}
                    startDelay= {1000}
                    backDelay= {500}
                    backSpeed= {40}
                    loop
                    ></Typed>
            </div>
        </div>
        <div className="row">
            <div className="col-"></div>
            <div className="col-lg-6 col-12 icons">
                <div className="item">
                    <img src={checklist} />
                    <span className="caption">Set a Financial Goal.</span>
                </div>
                <div className="item">
                    <img src={invoice} />
                    <span className="caption">Save Your Records.</span>
                </div>
                <div className="item">
                    <img src={receipt} />
                    <span className="caption">Reduce Your Expenses.</span>
                </div>
                <div className="item">
                    <img src={calculator} />
                    <span className="caption">Integrated Solution.</span>
                </div>
                <div className="item">
                    <img src={wallet} />
                    <span className="caption">Save More Money!</span>
                </div>
            </div>
            <div className="col-"></div>
        </div>


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