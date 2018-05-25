import React, { Component } from 'react';
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
    }
        render() {
            
            return ( <div>
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
                    </div>
            )
        }
    }

export default Index;