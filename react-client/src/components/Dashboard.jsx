import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BillSplits from './BillSplits.jsx';
import UserInfo from './UserInfo.jsx';
import BillSplitItem from './BillSplitItem.jsx';
import DebtsSummary from './DebtsSummary.jsx';
import App from '../index.jsx';
import Signup from './Signup.jsx';
import CreateEvent from './CreateEvent.jsx';

import { Link } from 'react-router-dom';




class Dashboard extends Component {
   constructor(props) {
     super(props);
     this.state = {
       billSplitItems : []
     }
   }

  // componentWillMount() {
  //   this.setState({
  //     billsplititems : [{
  //       "event":"Sushi Dinner",
  //       "debtor":"Robert",
  //       "creditor":"Group1",
  //       "eventid":"174",
  //       "amount":"25.50"
  //     },
  //     {
  //       "event":"Ski Trip Tahoe",
  //       "debtor":"Eve",
  //       "creditor":"Group2",
  //       "eventid":"178",
  //       "amount":"27.00"
  //     },
  //     {
  //       "event":"BBQ Picnic",
  //       "debtor":"Zander",
  //       "creditor":"Group3",
  //       "eventid":"179",
  //       "amount":"56.00"
  //     }
  //   ]})
  // }

   componentDidMount() {
    let self = this;
     fetch('/billsplits', {
       method :  "GET",
       }).then(function(response) {
        if (response.status>=400) {

        }
    //    console.log("response");
    //    console.log(response.json());
        return response.json();
     }).then(function (data) {
        console.log("data response " + JSON.stringify(data))
        var sdata = JSON.stringify(data);
        self.setState({billSplitItems : data});
     }).catch(err => {
        console.log("Error in fetch " + err);
     })
   }

  render() {
    return (
      <div>
      <header>BillSplits</header>
      <br />
      <DebtsSummary />
      <br />
      <br />
      <a><Link to=''></Link>Add a New Split</a>
            <br />
            <br />
        <BillSplits billsplititems={this.state.billSplitItems}/>
      </div>
    );
  }
}

export default Dashboard;