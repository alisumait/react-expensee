import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2'
import {CSVLink, CSVDownload} from 'react-csv';
import firebase, {database} from '../firebase.js';
import './reports.css'

class Reports extends Component{

    constructor(props){
        super(props);

        this.database = database;
        this.handleCat = this.handleCat.bind(this);
        this.writeNote = this.writeNote.bind(this);

        this.state = {
            foodPrice: this.props.foodPrice,
            transportationPrice: this.props.transportationPrice,
            utilitiesPrice: this.props.utilitiesPrice,
            stationaryPrice: this.props.stationaryPrice,
            otherPrice: this.props.otherPrice,
            month: '',
            csvData: null
        }
    }

componentWillReceiveProps(nextProps) {
  this.setState({ 
      foodPrice: nextProps.foodPrice,
      transportationPrice: nextProps.transportationPrice,
      utilitiesPrice: nextProps.utilitiesPrice,
      stationaryPrice: nextProps.stationaryPrice,
      otherPrice: nextProps.otherPrice,
  });
}

    static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'center'
  }

    handleCat(e){
        this.setState({
            month: e.target.value,
        })
        
    }
    writeNote(){
        this.setState({
            foodPrice: 0,
            transportationPrice: 0,
            utilitiesPrice: 0,
            stationaryPrice: 0,
            otherPrice: 0,
        })
    this.props.getChart(this.state.month);
    }

    render(){ 
    var csvData = [];
        csvData.push(
            ["Expense", "Category", "Price","Date"]
            );
      var that = this;
      this.props.expenses.map((name, index) => {
          csvData.push(
            [name.expense, that.props.cats[index].category ,that.props.prices[index].price, name.day+'/'+name.month]
      )
      });
        console.log(csvData);
      this.state.csvData = csvData;
        
        defaults.global.defaultFontFamily = 'Averta'

        var chart = {
        labels: ['Food', 'Transportation', 'Utilities', 'Stationary', 'Other'],
        datasets:[
          {
            label:'Expenses',
            data:[
              this.state.foodPrice,
              this.state.transportationPrice,
              this.state.utilitiesPrice,
              this.state.stationaryPrice,
              this.state.otherPrice
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 202, 70, 0.7)',
              'rgba(0, 0, 0, 0.6)',
              'rgba(153, 102, 255, 0.7)'
            ]
          }
        ]
        };
        return(
            <div id="Reports" className="row">
                
                <div className="col-6">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-8 selectors">
                        <select value={this.state.month} onChange={this.handleCat}>
                        <option value="" disabled selected>Months</option>
                        <option value={1}>Jan</option>
                        <option value={2}>Feb</option>
                        <option value={3}>March</option>
                        <option value={4}>Apr</option>
                        <option value={5}>May</option>
                        <option value={6}>June</option>
                        <option value={7}>July</option>
                        <option value={8}>August</option>
                        <option value={9}>September</option>
                        <option value={10}>October</option>
                        <option value={11}>November</option>
                        <option value={12}>December</option>
                        </select>
                        <input type="button" onClick={this.writeNote} className="btn btn-primary" value="Display"></input>
                        </div>
                        <div className="col"></div>
                    
                    </div>
                                            <hr></hr>

                    <div className="selectors">
                        <div className="row">
                    <h4>Export all your records into an Excel sheet</h4>
                            </div>
                        <div className="row">
                         
                        <CSVLink className="ex" data={this.state.csvData} filename={"my-expenses.csv"}><input type="button" className="btn btn-warning" value="Export"></input>  </CSVLink>
                            
                        </div>
                        
                    </div>
                
                    </div>
                
                
                <div className="chart col-6">   
            <Pie
          data={chart}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            title:{
              display:this.props.displayTitle,
              text:'Expenses, For The Month Of "'+this.props.month+'"',
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition,
                  labels:{
                      fontSize: 13
                  }
            },
            tooltips: {
              callbacks: {
                title: function(item, data) {
                  return data['labels'][item[0]['index']];
                },
                label: function(item, data) {
                  return 'RM '+data['datasets'][0]['data'][item['index']];
                },
                afterLabel: function(item, data) {
                    //calc total
                  var dataset = data['datasets'][0];
                    var total = 0;
            total += that.state.foodPrice;
            total += that.state.transportationPrice;
            total += that.state.utilitiesPrice;
            total += that.state.stationaryPrice;
            total += that.state.otherPrice;
                  var percent = Math.round((dataset['data'][item['index']] / total) * 100);
                  return percent + '%';
                }
              },
              backgroundColor: '#FFF',
              tooltipTextAlign: 'center',
              titleFontSize: 16,
              titleFontColor: '#007bff',
              bodyFontColor: '#000000',
              bodyFontStyle: 'bold',
              titleFontStyle: 'bolder',
              bodyFontSize: 14,
              displayColors: false,
              xAlign: 'center',
              yAlign: 'bottom'
            }
          }}
               
        />
            </div>
       </div>
            
        )
    }
}


export default Reports;