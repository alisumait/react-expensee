import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';
import firebase, {auth, database} from '../firebase.js';


class Note extends Component{

    constructor(props){
        super(props);

        this.database = database;
    }
  
    componentWillMount(){
        var catr = this.props.cats;
        var result = catr.map(a => a.category);
        
        alert(JSON.stringify(result));
        console.log(catr);
const data = {
	labels: [
		'Red',
		'Green',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};
    }

  
  


    render(){
        return(
            
        <a onClick={this.displayblocks} class="note noteone">
                    <span class="closebtn one">&times;</span>
                    <div class="row">
                        <div class="col-8">
                            <span>Buy a new Car!</span>
                        </div>
                        <div class="col-4">
                            <span class="days">154 Days left</span>
                        </div>

                    </div>
                </a>
        )
    }
}


export default Note;