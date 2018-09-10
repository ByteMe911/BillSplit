import React, { Component } from 'react';
import App from '../index.jsx'

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

    this.state = {
      eventName: '',
      billCost: '',
      selectedMember: '',
      payee: '',
      name: '',
      members: []
    }
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

        <h4>Event Name</h4>
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

        <h4>Split Method</h4>
        <input
          id='evenSplit'
          type='radio'
          name='splitMethod'
          value='Even Split'
          checked
        />
        <lable for='evenSplit'>Even Split</lable>
        <input
          id='percentSplit'
          type='radio'
          name='splitMethod'
          value='Percent Split'
        />
        <lable for='percentSplit'>Percent Split</lable>

        <h4>Event Members</h4>
        <div>
          <button type="button" onClick={this.handleAddMember}>Add member</button>
          <button type="button" onClick={this.handleChangePayee}>Make Payee</button>
          <button type="button" onClick={this.handleRemoveMember}>Remove Member</button>
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
          <button type='button' onClick={this.handleFormSubmit}>Create Split</button>
        </div>

        <div>
          <p>{this.state.payee} paid the bill</p>
        </div>

      </form>
    );
  }
}

export default createEvent;