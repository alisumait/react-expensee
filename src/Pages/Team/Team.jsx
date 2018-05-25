import React, { Component } from 'react';
import './Team.css';
import Ali from '../../assets/img/ali.jpg';
import Mahin from '../../assets/img/mahin.jpg';
import Ovro from '../../assets/img/ovro.jpg';
import Ebrahim from '../../assets/img/ebrahim.jpg';
import Muttaki from '../../assets/img/muttaki.jpg';
import Company from '../../assets/img/company.jpg';

class Team extends Component {

    constructor(props) {
        super(props);
    }
    

    render(){
    return (
        <div>
        <div className="row">
            <div className="col-12 carousel">
                <img className="img" alt="Expensee img" src={Company}></img>
                <h1>About Expensee</h1>
            </div>
        </div>
        <div className="row mission">
            <div className="col-12">
                <h2>Our Mission</h2>
                <p>To create an easy way for individuals to manage their expenses and save time, money, and effort.</p>
                <p>We do this by continually innovating and updating our app.</p>
            </div>
        </div>
        <hr></hr>
        <br></br>
      <div className="row team">
        <div className="col-md-1" />
        <div className="col-md-10 col-12">
          <h2>Our Team</h2>
          <div className="card" style={{width: '18rem'}}>
            <img className="card-img-top" src={Ali} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Ali Sumait<span style={{display: 'block', marginTop: 3, fontWeight: 300, fontSize: 18}}>Full Stack Developer</span></h5>
              <a href="mailto:alisumait@gmai.com" className="btn btn-warning">contact</a>
            </div>
          </div>
          <div className="card" style={{width: '18rem'}}>
            <img className="card-img-top" src={Ovro} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Taufiqur Rahman<span style={{display: 'block', marginTop: 3, fontWeight: 300, fontSize: 18}}>UX Designer</span></h5>
              <a href="mailto:ovro@gmai.com" className="btn btn-warning">contact</a>
            </div>
          </div>
          <div className="card" style={{width: '18rem'}}>
            <img className="card-img-top" src={Mahin} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Mahin Arafat<span style={{display: 'block', marginTop: 3, fontWeight: 300, fontSize: 18}}>Web Developer</span></h5>
              <a href="mailto:mahin@gmai.com" className="btn btn-warning">contact</a>
            </div>
          </div>
          <div className="card" style={{width: '18rem'}}>
            <img className="card-img-top" src={Ebrahim} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Ebrahim<span style={{display: 'block', marginTop: 3, fontWeight: 300, fontSize: 18}}>Database Designer</span></h5>
              <a href="mailto:ebrahim@gmai.com" className="btn btn-warning">contact</a>
            </div>
          </div>
          <div className="card" style={{width: '18rem'}}>
            <img className="card-img-top" src={Muttaki} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Habib Al Muttaki<span style={{display: 'block', marginTop: 3, fontWeight: 300, fontSize: 18}}>Front-End Developer</span></h5>
              <a href="mailto:muttaki@gmai.com" className="btn btn-warning">contact</a>
            </div>
          </div>
        </div>
        <div className="col-md-1" />
      </div>
            </div>
    );
  }
}

    

export default Team;