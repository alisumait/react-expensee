import React, { Component } from 'react';
import './Goals.css';
import Goal from "../assets/img/goal.png";

class Goals extends Component{
    constructor(props){
        super(props);
        
        this.displayblocks = this.displayblocks.bind(this);
        this.displayblockw = this.displayblockw.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleGoal = this.handleGoal.bind(this);
        this.handleCost = this.handleCost.bind(this);
        this.handlePercentage = this.handlePercentage.bind(this);
        this.handleSpending = this.handleSpending.bind(this);
        this.writeNote = this.writeNote.bind(this);

        this.state = {
            displaysignin: false,
            displaysignup: false,
            newGoalName: '',
            newGoalPrice: '',
            newGoalPercentage: '',
            newGoalSpending: '',
    }
    }
    
    
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    
    displayblocks(e) {
        this.setState({
            displaysignin: !this.state.displaysignin
        });
    }
    displayblockw(e) {
        this.setState({
            displaysignup: !this.state.displaysignup
        });
    }
    
    handleClickOutside(event) {
        var signup = document.getElementById('gl-one');
        var signin = document.getElementById('gl-two');
        if (signin == event.target) {
            this.setState({
                displaysignin: !this.state.displaysignin
            });
        }
        if (signup == event.target) {
            this.setState({
                displaysignup: !this.state.displaysignup
            });
        }
    }
    
    handleGoal(e){
        this.setState({
            newGoalName: e.target.value, // the value of the text input
        })
    }
    handleCost(e){
        this.setState({
            newGoalPrice: e.target.value, // the value of the text input
        })
    }
    handlePercentage(e){
        if(e.target.value != ''){
        this.setState({
            newGoalPercentage: parseInt(e.target.value) // the value of the text input
        })}
        else{
           this.setState({
            newGoalPercentage: '' // the value of the text input
        })  
        }
    }
    handleSpending(e){
        this.setState({
            newGoalSpending: e.target.value // the value of the text input
        })
    }
    
  writeNote(){
        if(this.state.newGoalName == '' || this.state.newGoalPrice <= 0 || this.state.newGoalPercentage <= 0 || this.state.newGoalSpending <= 0){
            if(this.state.newExpenseName == '')
                alert("Please type your goal");
            if(this.state.newGoalPrice <= 0)
                alert("Please enter a correct price");
            if(this.state.newGoalPercentage <= 0)
                alert("Please enter a correct Percentage value");
            if(this.state.newGoalSpending <= 0)
                alert("Please enter a correct spending value");
        }
        else{
        this.props.addGoal(this.state.newGoalName, this.state.newGoalPrice, this.state.newGoalSpending, this.state.newGoalPercentage);
        // Set newNoteContent back to an empty string.
        this.setState({
            newGoalName: '',
            newGoalPrice: '',
            newGoalPercentage: '',
            newGoalSpending: '',
        })
          
      }

  }

    render(){

        return(
            <div id="Goals">
        <div className="row">
            <div className="col-1"></div>
            <div className="col-8 goaladder">
                <form>
                    <div className="row">
                <input type="text" onChange={this.handleGoal} value={this.state.newGoalName} className="info" placeholder="Your Goal"></input>
                    <input type="number" onChange={this.handleCost} value={this.state.newGoalPrice} className="info" placeholder="How Much It Costs?"></input>
                        </div>
                    <input type="number" onChange={this.handleSpending} value={this.state.newGoalSpending} className="info" placeholder="Your Daily Spending?"></input>
                    <input type="text" onChange={this.handlePercentage} value={this.state.newGoalPercentage} id="percentage" className="info" placeholder="Savings pecentage eg. 10"></input>
                        <input type="button" onClick={this.writeNote} className="btn btn-primary" value="Add"></input>
                </form>

            </div>
            <div className="col"></div>
        </div>

        <img src={Goal} className="goalpic"></img>

                </div>
        )
    }
}

export default Goals;