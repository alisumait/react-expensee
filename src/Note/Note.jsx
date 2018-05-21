import React, { Component } from 'react';
import './Note.css';
import PropTypes from 'prop-types';

class Note extends Component{

    constructor(props){
        super(props);
        this.noteContent = props.noteContent; 
        this.price = props.price; 
        this.cat = props.cat; 
        this.noteId = props.noteId; 
        this.handleRemoveNote = this.handleRemoveNote.bind(this);
        
        this.state = {
            disp: true,
        }
    }

    handleRemoveNote(id, price){
        this.props.removeNote(id, price);
    }
    
    displayer(v){
        if(v == false){
            this.setState({
                disp: false
            })
        }
    }
    componentWillMount(){
        this.displayer(this.props.display);
    }

    render(){
        return(
            <div id="Note" className="row fade-in" style={{zIndex: '0'}}>
        <div className="col"></div>
        <div className="col-sm-10 col-12" style={{zIndex: '0'}}>
            <div className="wrapper">
                <div className="note">
                    <span className="closebtn" style={{display: this.state.disp ? "block" : "none"}} onClick={() => this.handleRemoveNote(this.noteId, this.price)}>&times;</span>
                    <div className="row">

                        <div className="col-4 left">
                            <span>RM <span>{this.price}</span></span>

                        </div>
                        <div className="col-4 center">
                            <span>{this.noteContent}</span>

                        </div>
                        <div className="col-4 right">
                            <span>{this.cat}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div className="col"></div>
    </div>
        )
    }
}

Note.propTypes = {
    noteContent: PropTypes.string,
    price: PropTypes.number,
    cat: PropTypes.string
}

export default Note;