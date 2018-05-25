import React, { Component } from 'react';
import firebase, {auth, database} from '../firebase.js';
import { Redirect } from 'react-router-dom';
import './Profile.css';
import Profile from '../assets/img/profile.png';

class Team extends Component {

    constructor(props) {
        super(props);
        this.updateInfo = this.updateInfo.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.database = database;
        this.state = {
            deleted: false
        }
    }
    
    updateInfo(){
    var newPassword = document.getElementById('password').value;
    var newEmail = document.getElementById('email').value;
      
    this.props.user.updateEmail(newEmail).then(function() {
        alert("Email updated successfully");
    }).catch(function(error) {
        alert(error);
    });
        
    this.props.user.updatePassword(newPassword).then(function() {
      alert("Password updated successfully");
    }).catch(function(error) {
        alert(error);
    });
        
    }
    
    deleteUser(){    
        var that = this;
        if(window.confirm('Delete your account?')){
    this.props.user.delete().then(function() {
      alert("Your account has been successfully deleted.");
        that.setState({
            deleted: true
        });
        that.database.ref("users").child(that.props.user.uid).remove();
        that.database.ref("goals").child(that.props.user.uid).remove();
        that.database.ref("expenses").child(that.props.user.uid).remove();
    }).catch(function(error) {
        alert(error);
    });
        }
        
    }

    render(){
        if(this.state.deleted){
        return(
        <Redirect to="/"></Redirect>
        )    
        }
        
    return (
        <div>
        <h2>Your Profile, {this.props.user.displayName}</h2>
        <div className="contact-wrap row">
            <div className="col-sm-12 imgr">
            <img className="img" src={this.props.profileimg || Profile}></img>            
            </div>
          <form acceptCharset="UTF-8" method="Put" className="contact-form row">
            <div className="col-sm-12">
              <div className="input-block">
                <input type="email" id="email" name="email" value={this.props.email} className="form-control" />
              </div>
            </div>
            <div className="col-sm-12">
              <div className="input-block">
                <input type="text" id="password" name="_subject" placeholder = "Write a new password (For Expensee Accounts)" className="form-control" />
              </div>
            </div>
            <div className="col-sm-12">
              <input type="button" onClick={this.updateInfo} name="submit" className="square-button" defaultValue="Update" />
            <input type="button" onClick={this.deleteUser} name="submit" className="square-button delete" defaultValue="Delete My Account" />
            </div>
          </form>
        </div>
        </div>
    );
  }
}

    

export default Team;