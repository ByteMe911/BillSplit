import React, { Component } from 'react';
import BillSplits from './components/BillSplits'
import UserInfo from './components/UserInfo'
import DebtsSummary from './components/DebtsSummary'
import CreateEvent from './Components/CreateEvent';
import './App.css';
import { Route, Link } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      billsplititems : []
    }
  }

  componentWillMount() {
    this.setState({
      billsplititems : [{
        "event":"Sushi Dinner",
        "debtor":"Robert",
        "creditor":"Group1",
        "eventid":"174",
        "amount":"25.50"
      },
      {
        "event":"Ski Trip Tahoe",
        "debtor":"Eve",
        "creditor":"Group2",
        "eventid":"178",
        "amount":"27.00"
      },
      {
        "event":"BBQ Picnic",
        "debtor":"Zander",
        "creditor":"Group3",
        "eventid":"179",
        "amount":"56.00"
      }
    ]})
  }

  render() {
    return (
      <div className="App">
      <header>BillSplits</header>
      <br/>
      <UserInfo />
      <p></p>
      <DebtsSummary />
      <BillSplits billsplititems={this.state.billsplititems} />
      </div>
    );
  }
}

export default App;
