import React from 'react';
import ReactDOM from 'react-dom';
import App from '../index.jsx';
import $ from 'jquery';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import { Switch } from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import createEvent from './createEvent.jsx';

  class Signup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        items: [],
        username: '',
        password: '',
        toDashboard: false
      };
      this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
      this.handleUserChange = this.handleUserChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUserChange(event) {
    this.setState({username: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSignupSubmit(event) {
  let currentComponent = this;
    $.post('http://localhost:3000/signup',
      {username : this.state.username + ':'+this.state.password},
        function(data,status) {
          console.log("data", data);
          console.log("status", status);
          if(data) {
            //currentComponent.setState({toDashboard: true});
          }
        }).then(() =>this.setState(() => ({
          toDashboard: true
          })))
  }

  render () {
    console.log("toDashboard",this.state.toDasboard);
    if (this.state.toDashboard === true) {
      return <Redirect to='/createEvent' />
    } else {
      return (

        <div>
          <h2>Invalid Username/Password! - Please Sign Up</h2>
          <form onSubmit={this.handleSignupSubmit}>
            <label>Username:</label>
             <input id="username" type="text"    name="username"onChange={this.handleUserChange}>
            </input>
            <label>Password:</label>
            <input id="password" type="password" name="password"onChange={this.handlePasswordChange}>
            </input>
           <input type="submit" value="Sign up">
           </input>
          </form>
        </div>
      );
    }
  }
}


export default Signup;


