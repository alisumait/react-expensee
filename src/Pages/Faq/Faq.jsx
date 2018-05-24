/////////Check it,Every time I run npm start,it directly go to the main page


import React, { Component } from 'react';
import {
    Link,
    NavLink,
    Redirect,
    Prompt
} from 'react-router-dom';

import '../../assets/css/style.css';
import './faq.css';

class Faq extends Component {

    constructor(props) {
        super(props);
        this.toggleAccordion=this.toggleAccordion.bind(this);
        
    }

    toggleAccordion() {
    this.classList.toggle('active');
    this.nextElementSibling.classList.toggle('active');
}


componentWillMount(){
     
    const items = document.querySelectorAll(".accordion a");
items.forEach(item => item.addEventListener('click', this.toggleAccordion));


}
    
    
        render() {
            
            
            return ( 
                <div id="av" className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8 col-12">
                <h2>Frequently Asked Questions</h2>

                <div className="accordion">
                    <div className="accordion-item">
                        <a>What services do we provide?</a>
                        <div classNameName="content">
                            <p>With our website you can set youir financial goal, save your records and much more!</p>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <a>How can I sign up/in?</a>
                        <div className="content">
                            <p>You can find the Sign Up/In button in the upper corner of our website. You. can se your e-mail id to sign up/in. And we made it easier with the social sign up/in feature.</p>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <a>What if I forgot password?</a>
                        <div className="content">
                            <p>Just click the "forget password?" button, we will send you the password recovery system by email.</p>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <a>How much I have to pay monthly?</a>
                        <div className="content">
                            <p>At the first 3 months it's free. After 3 months you'll have to pay $0.99 per month.</p>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <a>How do update my membership?</a>
                        <div className="content">
                            <p>You can contact us via email. Describe your needs we will provide a suitable feature for you.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-2"></div>

        </div>            )
        }
    }

export default Faq;


