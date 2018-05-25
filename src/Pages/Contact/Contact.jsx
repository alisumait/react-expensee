import React, { Component } from 'react';
import './contact.css';

class How extends Component {

    constructor(props) {
        super(props);
      
    }
    render() {
            
            return ( 
               <div id="Contact">
        <h2>Contact Us</h2>
        <div className="contact-wrap row">
          <form acceptCharset="UTF-8" action="http://formspree.io/expenseeapp@gmail.com" method="POST" className="contact-form row">
            <div className="col-sm-12">
              <div className="input-block">
                <input type="text" name="name" placeholder="Name" className="form-control" />
              </div>
            </div>
            <div className="col-sm-12">
              <div className="input-block">
                <input type="email" name="email" placeholder="Email" className="form-control" />
              </div>
            </div>
            <div className="col-sm-12">
              <div className="input-block">
                <input type="text" name="_subject" placeholder="Message Subject" className="form-control" />
              </div>
            </div>
            <div className="col-sm-12">
              <div className="input-block textarea">
                <textarea rows={4} name="message" placeholder="Drop Your Message Here" type="text" className="form-control" defaultValue={""} />
              </div>
            </div>
            <div className="col-sm-12">
              <input type="submit" name="submit" className="square-button" defaultValue="Send" />
            </div>
          </form>
        </div>
      </div>
            )
        }
    }

export default How;