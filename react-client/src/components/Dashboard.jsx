import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BillSplits from './BillSplits.jsx';
import UserInfo from './UserInfo.jsx';
import BillSplitItem from './BillSplitItem.jsx';
import DebtsSummary from './DebtsSummary.jsx';
import App from '../index.jsx';
import Signup from './Signup.jsx'



class Dashboard extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     billsplititems : []
  //   }
  // }

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

  render() {
    return (
      <div>
      <header>BillSplits</header>
      <br/>
      <UserInfo />
      <p></p>
      <DebtsSummary />
      <br />
      <br />
      <splitbutton><a>Add a New Split</a></splitbutton>
            <br />
            <br />
        <BillSplits/>
      </div>
    );
  }
}

export default Dashboard;