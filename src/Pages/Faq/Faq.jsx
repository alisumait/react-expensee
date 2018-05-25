import React, { Component } from 'react';
import './faq.css';
import ReactDOM from 'react-dom';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

class Faq extends Component {

    constructor(props) {
        super(props);
        
    }

        render() {
            
            
            return ( 
                <div id="av" className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8 col-12">
                <h2>Frequently Asked Questions</h2>
                <Accordion className="accordion">
        <AccordionItem className="accordion-item">
            <AccordionItemTitle>
                <h4>What services do we provide?</h4>
            </AccordionItemTitle>
            <AccordionItemBody classNameName="content">
                <p>With our website you can set youir financial goal, save your records and much more!</p>
            </AccordionItemBody>
        </AccordionItem>
        <AccordionItem className="accordion-item">
            <AccordionItemTitle>
                <h4>How can I sign up/in?</h4>
            </AccordionItemTitle>
            <AccordionItemBody classNameName="content">
                <p>You can find the Sign Up/In button in the upper corner of our website. You. can se your e-mail id to sign up/in. And we made it easier with the social sign up/in feature.</p>
            </AccordionItemBody>
        </AccordionItem>
        <AccordionItem className="accordion-item">
            <AccordionItemTitle>
                <h4>What if I forgot password?</h4>
            </AccordionItemTitle>
            <AccordionItemBody classNameName="content">
                <p>Just click the "forget password?" button, we will send you the password recovery system by email.</p>
            </AccordionItemBody>
        </AccordionItem>
        <AccordionItem className="accordion-item">
            <AccordionItemTitle>
                <h4>How much I have to pay monthly?</h4>
            </AccordionItemTitle>
            <AccordionItemBody classNameName="content">
                <p>It's free!</p>
            </AccordionItemBody>
        </AccordionItem>
        <AccordionItem className="accordion-item">
            <AccordionItemTitle>
                <h4>What services do we provide?</h4>
            </AccordionItemTitle>
            <AccordionItemBody classNameName="content">
                <p>With our website you can set youir financial goal, save your records and much more!</p>
            </AccordionItemBody>
        </AccordionItem>
    </Accordion>
                           </div>
            <div className="col-sm-2"></div>

        </div>            )
        }
    }

export default Faq;


