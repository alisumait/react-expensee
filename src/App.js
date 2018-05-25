import React, { Component } from 'react';
import firebase, {auth, database} from './firebase.js';
import { Link, NavLink, Redirect, Prompt} from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Fader from 'react-fader';
import Switch from 'react-router-transition-switch';
import Index from './Index/Index.jsx';
import Header from './Header/Header.jsx';
import Home from './Home/Home.jsx';
import Note from './Note/Note.jsx';
import NoteForm from './NoteForm/NoteForm.jsx';
import Reports from './Reports/Reports.jsx';
import Goals from './Goals/Goals.jsx';
import Carousel from './GoalSlider/Carousel.jsx';
import Contact from './Pages/Contact/Contact.jsx';
import How from './Pages/How/How.jsx';
import Team from './Pages/Team/Team.jsx';
import Faq from './Pages/Faq/Faq.jsx';
import Profile from './Profile/Profile.jsx';
import IndexHeader from './IndexHeader/IndexHeader.jsx';
import Footer from './Footer/Footer.jsx';
import './assets/css/style.css';
import Typed from 'react-typed';


class App extends Component {

  constructor(props){
    super(props);
    this.getUser = this.getUser.bind(this);
    this.addNote = this.addNote.bind(this);
    this.addGoal = this.addGoal.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.removeGoal = this.removeGoal.bind(this);
    this.getChart = this.getChart.bind(this);

this.monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
 // Setup the React state of the component
    this.state = {
        notes: [],
        prices: [],
        cats: [],
        goals: [],
        month: 0,
        userData: '',
        userId: null,
        loading: true,
        amount: 0,
        startAmount: 0,
        foodPrice: 0,
        transportationPrice: 0,
        utilitiesPrice: 0,
        stationaryPrice: 0,
        otherPrice: 0,
    }
      
      this.database = database;
  }
    
    
    
    
    getUser(userId){
        this.setState({userId: userId});
    }
    
    addNote(note,price,cat){
    var user = this.state.userId;
    var date = new Date().getMonth()+1;
    var day = new Date().getDate();
    var editexpense = this.database.ref("expenses").child(user);
    if((this.state.amount - price) >= 0){
    editexpense.push({ 
        expense: note,
        price: parseInt(price),
        category: cat,
        month: date,
        day: day,
    });
    var editamount = this.database.ref("users").child(user);
    editamount.update({
            amount: (this.state.amount - price)    
        });
    this.setState({
        startAmount: this.state.amount,
        amount: (this.state.amount - price)
    })
  }
        else
            alert("You cannot afford this!");
    }
    
    addGoal(goal, cost, spending, percentage){
    var user = this.state.userId;
    var editgoal = this.database.ref("goals").child(user);
    editgoal.push({
        goalName: goal,
        cost: parseInt(cost),
        dailySpending: parseInt(spending),
        percentage: percentage,
    });
    }
        
  removeNote(noteId, price){
    var user = this.state.userId;
    var editamount = this.database.ref("users").child(user);
    var editexpense = this.database.ref("expenses").child(user);
    editamount.update({
            amount: (this.state.amount + price)
        });
      
    this.setState({
        startAmount: (this.state.amount)
    })
      
    console.log("from the parent: " + noteId);
    editexpense.child(noteId).remove();
  }

  removeGoal(goalId){
    var user = this.state.userId;
    var editgoal = this.database.ref("goals").child(user);
    editgoal.child(goalId).remove();
    window.location.reload(); 
  }
    
    getChart(month){
    console.log(month);
    this.setState({
        month: month,
    })
     
    this.state.foodPrice= 0;
        this.state.transportationPrice= 0;
        this.state.utilitiesPrice= 0;
        this.state.stationaryPrice= 0;
        this.state.otherPrice = 0;
    var user = this.state.userId;
    var expenses = this.database.ref("expenses").child(user);
    var that = this;
    expenses.on('value', function(snap){
       
        snap.forEach(function(childsnap) {
        if(childsnap.val().month == month){
            if(childsnap.val().category == 'Food'){
                that.state.foodPrice += (childsnap.val().price);
            }
            else if(childsnap.val().category == 'Transportation'){
                that.state.transportationPrice += (childsnap.val().price);
              }
            else if(childsnap.val().category == 'Utilities'){
                that.state.utilitiesPrice += (childsnap.val().price);
              }
            else if(childsnap.val().category == 'Stationary'){
                that.state.stationaryPrice += (childsnap.val().price);
              }
            else if(childsnap.val().category == 'Other'){
                that.state.otherPrice += (childsnap.val().price);
              }     
        }});
    });
}
    
  splitTime(numberOfDays){
    var Year= Math.floor(numberOfDays/365);
    var Days = (numberOfDays%365);
    return({"Year":Year,"Days":Days});
}
    
    componentWillMount(){
    this.setState({ loading: false });
        var that = this;
        firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loading: false, userId: user.uid, userData: user });
        var useracc = that.state.userId;
        const previousNotes = that.state.notes;
        const previousPrices = that.state.prices;
        const previousCats = that.state.cats;
        const previousGoals = that.state.goals;
          
        var editamount = that.database.ref("users").child(useracc);
        editamount.child('amount').on('value', function(snap){
        that.setState({
            amount: snap.val()
                });        
        });
          
       
    // DataSnapshot
    that.database.ref("expenses").child(useracc).on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        day: snap.val().day,
        month: snap.val().month,
        expense: snap.val().expense,
      });
      previousPrices.push({
        id: snap.key,
        price: snap.val().price,
      });
      previousCats.push({
        id: snap.key,
        category: snap.val().category,
      });
      that.setState({
        notes: previousNotes,
        prices: previousPrices,
        cats: previousCats,
      })
        
    });
          
 

          
    that.database.ref("goals").child(useracc).on('child_added', snap => {
        var per = snap.val().dailySpending*(snap.val().percentage/100);
        var daysToComplete = snap.val().cost/per;
        
      previousGoals.push({
        id: snap.key,
        goalName: snap.val().goalName,
        days: parseInt(daysToComplete),
        amount: parseFloat(per).toFixed(2),
      });
        
      that.setState({
        goals: previousGoals,
      })
    });
          
 that.database.ref("goals").child(useracc).on('child_removed', snap => {

      for(var i=0; i < previousGoals.length; i++){
        if(previousGoals[i].id === snap.key){
          previousGoals.splice(i, 1);
        }
      } 
        that.setState({
        goals: previousGoals,
      })  
    })    

 that.database.ref("expenses").child(useracc).on('child_removed', snap => {
      for(var i=0; i < previousNotes.length; i++){
        if(previousNotes[i].id === snap.key){
          previousNotes.splice(i, 1);
        }
      }
      for(var i=0; i < previousPrices.length; i++){
        if(previousPrices[i].id === snap.key){
          previousPrices.splice(i, 1);
        }
      }
      for(var i=0; i < previousCats.length; i++){
        if(previousCats[i].id === snap.key){
          previousCats.splice(i, 1);
        }
      } 
        
        that.setState({
        notes: previousNotes,
        prices: previousPrices,
        cats: previousCats
      })
        
    })
        }
        else {
        this.setState({ loading: true, userId: null });
      }
    });        
    }
    
  render() {
      

    return (
        <Router>
        <Switch component={Fader}>
        
       <Route exact strict path="/" render={
            ()=> {
            var getUser  =   this.getUser;
                return(
                    <div>
                        <div className="container-fluid">
                    <IndexHeader getUser = {getUser.bind(this)}/>
                        <Index />
                    <Footer />
                        </div>
                    </div>
                )
            }
        } />
         
         <Route path="/success" render={
            ()=> {
                return(
                    <body id="thank">
                        <div className="container-fluid">
                        <div className="row">
            <div className="col"></div>
            <div className="col-md-8 col-sm-10 col-12">
                <header style={{textAlign: 'center'}}>
                    <Link className="logo" to="/" style={{padding: '0px !important'}}>expensee<p className="dot">.</p></Link>
                </header>
            </div>
            <div className="col"></div>
        </div>
        <div className="row second">
            <div className="col-lg-1"></div>
            <div className="col-lg-7 col-12 item">
                <div className="jumbo">
                <Typed className="typed2" strings= {["Terima Kasih", "Thank you", "谢谢","شكرا","ধন্যবাদ|"]}
            typeSpeed= {120}
                    backspeed= {80}
                    style={{display: 'inline'}}></Typed><p className="dot" style={{fontSize: '160px'}}>.</p>
                </div>
            </div>
            <div className="col-"></div>
        </div>
        <div className="circle"></div>
        
        </div>
                    </body>
                )
            }
        } />
         

        <Route exact path="/mainpage" render={
            ()=> {
            
                let noteState;
            var d = new Date();
            var noty = true;
            if(this.state.notes.length > 0){
            noteState = (
                        <div id="spacer">
              {          
                    this.state.notes.map((note, index) => {
            if((d.getDate() == note.day) && ((d.getMonth() + 1) == note.month)){
            noty = false;
                        return (
                        <Note noteContent={note.expense} 
                        key={note.id}
                        noteId={note.id} 
                        price={this.state.prices[index].price}
                        cat={this.state.cats[index].category}
                        removeNote ={this.removeNote}/>
                      )
   
                        }
}
                    )}
              </div>      
            )
            
        }if(noty) {
            noteState = (
            <h1 style={{textAlign: 'center', color: '#00c4ff', marginRight: '33px', fontWeight: '300'}}>You have no expenses this today. Yet!</h1>
            )
        }
                var getUser  =   this.getUser;
                return(
                    this.state.loading ?
                    //MAINPAGE
                    <Redirect to="/"></Redirect>
                    //.....
            :
                    <div>
                    <Header profileimg = {this.state.userData.photoURL} getUser = {getUser.bind(this)}/>
                    <Home user = {this.state.userId} startAmount = {this.state.startAmount} amount = {this.state.amount}/>
                    { noteState }
                    <NoteForm addNote={this.addNote}/>
                    </div>
)
            }
        } />

         
        <Route exact path="/mainpage/:month/:day" render={
            (props)=> {
            
            var d = new Date();
            let noteState;
            let adder;
            var noty = true;
            var disp = false;
            if((parseInt(props.match.params.month) == (d.getMonth()+1)) && (parseInt(props.match.params.day)) == d.getDate()){
                disp = true;
                adder = (
                <NoteForm addNote={this.addNote}/>
                )
                }
                
            noteState = (
                                    <div id="spacer">
{
            this.state.notes.map((note, index) => {
            if((parseInt(props.match.params.month) == note.month) && (parseInt(props.match.params.day) == note.day)){
                        noty = false;
        return(
                        <Note noteContent={note.expense} 
                        noteId={note.id} 
                        key={note.id}
                        price={this.state.prices[index].price}
                        cat={this.state.cats[index].category}
                        removeNote ={this.removeNote}
                        display = {disp}/>
)
}
}
)
}

</div>
);
    
if(noty) {
            noteState = (
            <h1 style={{textAlign: 'center', color: '#00c4ff', marginRight: '33px', fontWeight: '300'}}>You have no expenses this today. Yet!</h1>
            )
        }

                var getUser  =   this.getUser;
                return(
                    this.state.loading ?
                    //MAINPAGE
                    <Redirect to="/"></Redirect>
                    //.....
            :
                    <div>
                    <Header profileimg = {this.state.userData.photoURL} getUser = {getUser.bind(this)}/>
                    <Home user = {this.state.userId} startAmount = {this.state.startAmount} amount = {this.state.amount}/>
                    { noteState }
                    { adder }
                    </div>
)
            }
        } />


    <Route exact path="/goals" render={
            ()=> {              

        let dataTargets;        
        let caro;        
            
        dataTargets = (    
                    this.state.goals.map((goal, index) => {
                        var ind = index + 1;
                        return (
<li data-target="#carouselExampleIndicators" data-slide-to={ind.toString()} className="active"></li>
                      )
}
                    )
            )

        caro = (    
                    this.state.goals.map((goal, index) => {
                        var days = goal.days;
                        var timeResult = this.splitTime(days);
                        return (
                        <Carousel 
                        goalName={goal.goalName}
                        key={goal.id}
                        goalId={goal.id} 
                        save={"You need to save RM "+goal.amount}
                        period={"For "+timeResult.Year + " Years & "+timeResult.Days+" Days"}
                        removeGoal = {this.removeGoal} />
                        )
}
                    )
            );
            
            
                return(
                    
                    this.state.loading ?
                    //MAINPAGE
                    <Redirect to="/"></Redirect>
                    //.....
            :
                    <div>
                    <Header profileimg = {this.state.userData.photoURL} getUser = {this.getUser.bind(this)}/>
                    <Goals addGoal={this.addGoal}/>

    <div id="carouselExampleIndicators" data-interval="6000" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
      {dataTargets}     
  </ol>
  <div className="carousel-inner">
    <div style={{marginTop: '115px'}} className="carousel-item active">
      <h1>Goals</h1>
    </div>
    { caro } 
  </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>                    

                    </div>
                )
            }
        } />
    var month = (new Date().getMonth() + 1);
month = new Date().to

<Route exact path="/reports" render={
            ()=> {
    var getUser = this.getUser;
                return(
    this.state.loading ?
                    //MAINPAGE
                    <Redirect to="/"></Redirect>
                    //.....
            :
                    <div>
    <Header profileimg = {this.state.userData.photoURL} getUser = {getUser.bind(this)}/>

    <Reports 
    foodPrice={this.state.foodPrice} 
    transportationPrice={this.state.transportationPrice} 
    utilitiesPrice={this.state.utilitiesPrice} 
    stationaryPrice={this.state.stationaryPrice} 
    otherPrice={this.state.otherPrice} 
    month = {this.monthNames[this.state.month-1]}
    legendPosition="bottom"
    expenses = {this.state.notes}
    prices = {this.state.prices}
    cats = {this.state.cats}
    getChart = {this.getChart}/>
                        </div>
                )
            }
        } />

<Route exact path="/contact" render={
            ()=> {
    var getUser = this.getUser;
                return(
    <body id="cont">
    <div className="container-fluid">
    <IndexHeader getUser = {getUser.bind(this)}/>
    <Contact />
    <Footer />
        </div>
</body>
                )
            }
        } />


<Route exact path="/how" render={
            ()=> {
    var getUser = this.getUser;
                return(
    <body>
    <div className="container-fluid">
    <IndexHeader getUser = {getUser.bind(this)}/>
    <How />
    <Footer />
        </div>
</body>
                )
            }
        } />

<Route exact path="/team" render={
            ()=> {
    var getUser = this.getUser;
                return(
    <body id="Team">
    <div className="container-fluid">
    <IndexHeader getUser = {getUser.bind(this)}/>
    <Team />
    <Footer />
        </div>
</body>
                )
            }
        } />

<Route exact path="/faq" render={
            ()=> {
    var getUser = this.getUser;
                return(
    <body>
    <div className="container-fluid">
    <IndexHeader getUser = {getUser.bind(this)}/>
    <Faq />
    <Footer />
        </div>
</body>
                )
            }
        } />

<Route exact path="/profile" render={
            ()=> {
    console.log(this.state.userData);
    var getUser = this.getUser;
                return(
    this.state.loading ?
                    //MAINPAGE
                    <Redirect to="/"></Redirect>
                    //.....
            :
                    <body id="Profile">
    <div className="container-fluid">
    <Header getUser = {getUser.bind(this)} profileimg = {this.state.userData.photoURL}/>
    <Profile profileimg = {this.state.userData.photoURL} user = {this.state.userData} email = {this.state.userData.email}/>
        </div>
</body>
                )
            }
        } />

<Route path = "*" render={
            ()=> {
                return(
                        <div className="container-fluid">
                    <h1 style={{position: 'relative', top: '50%', transform: 'translateY(-50%)', textAlign: 'center'}}>Sorry, this page is unavailable!
                        <br></br>
                        <Link to="/" >Go back</Link>
                        </h1>
                        </div>
                )
            }
        } />
            </Switch>
            </Router>
    )
      
  }
  

    }
                              
     
export default App;