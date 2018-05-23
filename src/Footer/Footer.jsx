import React, { Component } from 'react';
import {
    Link,
    NavLink,
    Redirect,
    Prompt
} from 'react-router-dom';
import '../assets/css/style.css';

class Footer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            
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
                    <li><Link to="/team">Our Team</Link></li>
                    <li><Link to="/how">How it Works?</Link></li>
                    <li><Link to="/faq">FAQs</Link></li>
                </ul>
            </div>
            <div className="col-lg-2 col-12">
                <ul style={{listStyle: 'none'}}>
                    <h4>Social</h4>
                    <hr></hr>
                    <li><a href="https://www.twitter.com/expenseeapp">Twitter</a></li>
                    <li><a href="https://www.facebook.com/ali.app.353">Facebook</a></li>
                    <li><Link to="/contact">Get in Touch</Link></li>
                </ul>
            </div>
            <div className="col-lg-2"></div>
        </footer>
            )
         }
    }

export default Footer;