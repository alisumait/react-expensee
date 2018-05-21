import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Carousel extends Component{

    constructor(props){
        super(props);
        this.goalName = props.goalName; 
        this.save = props.save; 
        this.period = props.period; 
        this.handleRemoveGoal = this.handleRemoveGoal.bind(this);
        
    }

    handleRemoveGoal(id){
        this.props.removeGoal(id);
    }


    render(){
        return(
    <div className="carousel-item">
        <span className="closebtn" 
        onClick={() => this.handleRemoveGoal(this.props.goalId)}>✔</span>
        <h1>{this.props.goalName}</h1>
        <h2>{this.props.save}</h2>
        <h3>{this.props.period}</h3>
    </div>
        )
    }
}

Carousel.propTypes = {
    goalName: PropTypes.string,
    save: PropTypes.number,
    period: PropTypes.string
}

export default Carousel;