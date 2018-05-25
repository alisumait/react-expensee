import React, { Component } from 'react';
import firebase, {auth, facebookProvider, googleProvider, twitterProvider} from '../firebase.js';
import {
    Link,
    Redirect
} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import '../assets/css/style.css';
import Profile from '../assets/img/profile.png';
import './Header.css';


class Header extends Component {

    constructor(props) {
        super(props);
        this.toggleSignOut = this.toggleSignOut.bind(this);
        
    }
    
    
    toggleSignOut() {
    var getUser = this.props.getUser;
        auth.signOut()
        .then(() => {
            this.setState({logged: false});
            getUser(null) ;
        });
 } 
    

        render() {
            return (
                <div id="header">
                  <div className="row">
            <div className="col"></div>
            <div className="col-md-8 col-sm-10 col-12">

                <header>

                    <Link className="logo" to="/mainpage">expensee<p className="dot">.</p></Link>

                    <nav className="navbar navbar-expand-lg navbar-light">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <Link className="nav-link text" to="/mainpage">Expense <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link text" to="/goals">Goals</Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link text" to="/reports">Reports</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src={this.props.profileimg || Profile}></img>
        </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <Link className="dropdown-item" to="/profile">My profile</Link>
                                        <Link to="/" className="dropdown-item" onClick={() => this.toggleSignOut()}>Log out</Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
            </div>
            <div className="col"></div>
        </div>
        </div>
            )
        }
    }

export default Header;