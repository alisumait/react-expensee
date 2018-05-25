import React, { Component } from 'react';
import './How.css';

class How extends Component {

    constructor(props) {
        super(props);
        
    }
    
        render() {
           
            return ( 
               <div className="row list">

            <div className="col-sm-2"></div>
            <div className="col-sm-8 col-12">
                <h2>How it Works?</h2>


                <dl>

                    <dt>Accounts:</dt>
                    <dd>First, to get an access an account, you have to has to register first with e-mail address and create a password - If you have facebook, twitter, or google account, you can also access the site using these.
                    </dd>
                    <dt>What Can You Do:</dt>
                    <dd>
                        <ul style={{paddingLeft: '40px', marginTop: '16px'}}>
                            <li>Organize your expenses.</li>
                            <li>Achieve your financial goals.</li>
                            <li>Keep your expenses records safely.</li>
                        </ul>
                    </dd>
                    <dt>Security:</dt>
                    <dd>Your security is our concern. Your personal information will secure in our site - No unauthorised access. - If wrong password given three times in a row,account will be locked.To acces site again we will give authenticaton code in your mail.
                    </dd>
                    <dt>Features:</dt>
                    <dd>You can add your expenses everyday and view how much you've spent anytime.
                        <p>At the end of the month, you can automatically convert the month's expenses into a categorized chart so you manage your money better.</p>
                    </dd>
                    <dt>How We Reward:</dt>
                    <dd>We don't return our customers with empty hands - Every month we reward our customers with points based on usages - The top scorer gets gifts, vouchers, and some free packages from our team
                    </dd>
                </dl>
            </div>
            <div className="col-sm-2"></div>
        </div>
 
            )
        }
    }

export default How;