import React, { Component } from 'react';
import App from '../index.jsx'
import $ from 'jquery';

class createEvent extends Component {

  constructor(props) {
    super(props)

    this.handleEventChange = this.handleEventChange.bind(this);
    this.handleMemberChange = this.handleMemberChange.bind(this);
    this.handleAddMember = this.handleAddMember.bind(this);
    this.handleCostChange = this.handleCostChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleChangePayee = this.handleChangePayee.bind(this);
    this.handleRemoveMember = this.handleRemoveMember.bind(this);
    this.createSplit = this.createSplit.bind(this);
    this.showResults = this.showResults.bind(this);

    this.state = {
      eventName: '',
      billCost: '',
      selectedMember: '',
      payee: '',
      name: '',
      members: [],
      result: {},
      text: ''
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/createEvent/')
      .then(
        (data) => {
          this.setState({
            result: {data}
          });
        });
      // `var that = this` 
      // `that.setState()`
  }

  showResults() {
    // var test = {};
    // this.state.members.forEach(function(obj) {
    //   console.log(`${obj.name}'s amount is ${obj.value}`);
    //   test[obj.name] = obj.value;
    // }); 
    // console.log(test);
    console.log('final debts', this.state.result);
    var result = this.state.result
    var positive = ''
    for (var name in result) {
      if (result[name] > 0) {
        positive = name;
      }
      if (result[name] < 0) {
        console.log(`${name} owes ${positive} ${result[name]}`)
        this.state.text.concat(`${name} owes ${positive} ${result[name]}`, '\n');
      }
    }
    this.setState({text: this.state.text});
  }

  createSplit() {
    var average = this.state.billCost/this.state.members.length;
    var amount = parseFloat(Math.round(average * 100) / 100).toFixed(2);
    var payee = this.state.payee;
    var event = this.state.eventName;
    for (var i = 0; i < this.state.members.length; i++) {
      var person = this.state.members[i].name;
      if (person !== payee) {
        var msg = `${person}, owes ${payee} $${amount} for ${event}.`;
        console.log(msg);
        this.state.members[i].value = amount * -1;
      } else {
        this.state.members[i].value = this.state.billCost - amount;
      }
    }

    var eventObj = {};
    eventObj.event = this.state.eventName;
    eventObj.members = this.state.members;
    var objStr = JSON.stringify(eventObj);
    console.log('jsoned obj', objStr)

    $.post("http://localhost:3000/createEvent",
      {objStr}, function(data, status) {
        console.log("data json", data);
        console.log("status", status);
    });

    $.get("http://localhost:3000/createEvent", function(data) {
      console.log('log', data);
    }).done(data => {
    this.setState({result: data});

  });
    console.log('outside get', this.state.message)
  }

  handleAddMember(event) {
    let newArray = this.state.members;
    let newName = this.state.name;
    if (!newName) {
      return;
    }
    newArray.push({
      name: newName
    });
    this.setState({
      members: newArray,
      name: ''
    });
    console.log(this.state)
  }

  handleFormSubmit(event) {
    fetch('http://localhost:3000/createEvent',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventName: this.state.eventName,
        billCost: this.state.billCost,
        members: this.state.members,
        payee: this.state.payee
      })
    })
  }

  handleChangePayee(event) {
    this.setState({payee: this.state.selectedMember});
    console.log(this.state.payee);
  }

  handleSelectChange(event) {
    this.setState({selectedMember: event.target.value});
  }

  handleMemberChange(event) {
    this.setState({name: event.target.value});
  }

  handleEventChange(event) {
    this.setState({eventName: event.target.value});
  }

  handleCostChange(event) {
    this.setState({billCost: event.target.value})
  }

  handleRemoveMember(event) {
    for (let i = 0; i < this.state.members.lenght; i++) {

    }
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit} className="createEventContainer">

        <h4>Bill Name</h4>
        <input
          type='text'
          onChange={this.handleEventChange} type="text"
          value={this.state.eventName}
        />

        <h4>Bill Cost</h4>
        <input
          type='text'
          onChange={this.handleCostChange} type="text"
          value={this.state.billCost}
        />
        
        <h4>Event Members</h4>
        <div>
          <button type="button" onClick={this.handleAddMember}>Add member</button>
          <button type="button" onClick={this.handleChangePayee}>Make Payee</button>
        </div>
        <input
          type="text"
          onChange={this.handleMemberChange}
          value={this.state.name}
        />
        <select value={this.state.selectedMember} onChange={this.handleSelectChange}>
          {
            this.state.members.map(function(member) {
              return <option value={member.name}>{member.name}</option>
            })
          }
        </select>
        <div>
          <button type='button' onClick={this.createSplit}>Add Split</button>
        </div>
        
        <div>
          <button type='button' onClick={this.showResults}>Show Results</button>
        </div>

        <div>
          <p>{this.state.payee} paid the bill</p>
        </div>
        <div>
          <p>{this.state.text}</p>
        </div>

      </form>
    );
  }
}

export default createEvent;