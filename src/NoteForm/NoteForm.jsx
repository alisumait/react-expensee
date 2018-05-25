import React, { Component } from 'react';
import './NoteForm.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {
    Redirect
} from 'react-router-dom';

class NoteForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            newExpenseName: '',
            newExpensePrice: '',
            newExpenseCat: '',
            startDate: moment(),
            archive: false,
        };
        

        this.handleText = this.handleText.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
        this.handleCat = this.handleCat.bind(this);
        this.writeNote = this.writeNote.bind(this);
        this.handleDate = this.handleDate.bind(this);
    }

    
    handleDate(date) {
        this.setState({
            startDate: date,
            archive: true    
        });
  }
    
    // When the user input changes, set the newNoteContent
    // to the value of what's in the input box.
    handleText(e){
        this.setState({
            newExpenseName: e.target.value, // the value of the text input
        })
    }
    handleNumber(e){
        this.setState({
            newExpensePrice: e.target.value, // the value of the text input
        })
    }
    handleCat(e){
        this.setState({
            newExpenseCat: e.target.value // the value of the text input
        })
    }

    writeNote(){
        // call a method that sets the noteContent for a note to
        // the value of the input
        if(this.state.newExpenseName == '' || this.state.newExpensePrice <= 0 || this.state.newExpenseCat == ''){
            if(this.state.newExpenseName == '')
                alert("Please enter the item's name");
            if(this.state.newExpensePrice <= 0)
                alert("Please enter a correct price");
            if(this.state.newExpenseCat == '')
                alert("Please enter a correct category");
        }
        else{
             this.props.addNote(this.state.newExpenseName, this.state.newExpensePrice, this.state.newExpenseCat);
        // Set newNoteContent back to an empty string.
        this.setState({
            newExpenseName: '',
            newExpensePrice: '',
            newExpenseCat: '',
        })}
    }

    render(){
        
        if(this.state.archive){
            var d = new Date(this.state.startDate);
            var month = d.getMonth() + 1;
            var day = d.getDate();
            return(
            <Redirect to={`/mainpage/${month}/${day}`}></Redirect>
            )
        }
        return(
            <div id="NoteForm" className="formWrapper">
                
                <div className="row adder">
        <div className="col"></div>
        <div className="col-sm-11 col-12 centered">
            <form>
                <input type="text" className="inputs" placeholder="What you bought?" value={this.state.newExpenseName} onChange={this.handleText}></input>
                <input type="number" className="inputs" value={this.state.newExpensePrice} onChange={this.handleNumber} placeholder="How much?"></input>
                <select value={this.state.newExpenseCat} onChange={this.handleCat} className="form-control">
  <option value="" disabled selected>Category</option>
  <option value="Food">Food</option>
  <option value="Transportation">Transportation</option>
  <option value="Utilities">Utilities</option>
  <option value="Stationary">Stationary</option>
  <option value="Other">Other</option>
</select>
                <input type="button" onClick={this.writeNote} className="btn btn-primary" value="Add"></input>
                <DatePicker
                        popoverAttachment='bottom right'
                        className="datepicker"
                        selected={this.state.startDate}
                        onChange={this.handleDate}
                        />
            </form>
            
        </div>
        <div className="col"></div>
    </div>
            </div>
        )
    }
}

export default NoteForm;