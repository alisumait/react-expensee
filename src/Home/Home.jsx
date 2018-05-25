import React, { Component } from 'react';
import firebase, {auth, database} from '../firebase.js';
import Route from 'react-router-dom/Route';
import '../assets/css/style.css';
import Profile from '../assets/img/profile.png';
import './Home.css';
import CountUp from 'react-countup';


class Home extends Component {
    
    constructor(props) {
        super(props);  
        this.database = database;
        this.displayblockw = this.displayblockw.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        
        this.state = {
            displayamount: false,
            amount: 0
        }
    }
    
     componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    
    componentWillMount(){
        this.setState({
            amount: this.props.amount
        })
    }
    
     componentDidMount() {
        var user = this.props.user;
        document.addEventListener('mousedown', this.handleClickOutside);
         
        window.onscroll = function() {myFunction()};

        var navbar = document.getElementById("Home");

        var sticky = navbar.offsetTop;

        function myFunction() {
          if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky")
          } else {
            navbar.classList.remove("sticky");
          }
        }
      }
    
  
    
    handleClickOutside(event) {
        var user = this.props.user;
        var setamount = document.getElementById('set-amount');
        var change = document.getElementById('password');
        if (setamount == event.target) {
            this.setState({
                displayamount: !this.state.displayamount
            });
            var editamount = this.database.ref("users").child(user);
            if(parseInt(change.value) >= 0){
            editamount.update({ amount : parseInt(change.value) });

            this.setState({
                amount : parseInt(change.value)
            })
            }
        }
    }
    
    displayblockw(e) {
        this.setState({
            displayamount: !this.state.displayamount
        });
    }

        render() {
            return (
                <div id="Home">
                    
                    <div id="set-amount" style={{display: this.state.displayamount ? 'block' : 'none'}} className="back">
            <div className="amount-box animate">
                <div className="row center">
                    <div className="col-12 centered">
                        <h1>Edit the Amount:</h1>

                        <input type="text" name="password" placeholder="Password" id="password" />
                       
                    </div>
                </div>
            </div>
                    </div>
        
                    
                    <div className="row second">
        <div className="col"></div>
        <div className="col-sm-4 col-12 item">
    <span onClick={this.displayblockw}>
    <CountUp
    className="count"
    start={this.props.startAmount}
    end={this.props.amount}
    duration={1.2}
    useEasing={true}
    useGrouping={true}
    separator=""
    decimals={0}
    decimal=","
    suffix=" "
  />
        
            <span>RM left</span>
            </span>
        </div>
        <div className="col"></div>
    </div>
                                    </div>
                    )
                }
            }

export default Home;