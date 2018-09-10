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



class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      toWhere: ''
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.username);
    console.log(this.state.password);
    let currentComponent = this;
    console.log("currentComponent", currentComponent);
    $.post('http://localhost:3000/login',
      {username : this.state.username + ':'+this.state.password},
        function(data,status) {
          console.log("data", data);
          console.log("status", status);
          if(data === 'dashboard') {
            currentComponent.setState({toWhere: 'dashboard'});
          } else if (data === 'signup') {
            currentComponent.setState({toWhere: 'signup'});
          } else {
            currentComponent.setState({toWhere: 'login'});
          }
        }).then(() => console.log(this.state.toWhere,"toWhere value"));/*.then(() =>this.setState(() => ({
          toWhere: 'dashboard'
          })))*/
  }
  render() {
    if (this.state.toWhere === 'dashboard') {
      return <Redirect to='/dashboard' />
    } else if (this.state.toWhere === 'signup') {
      return <Redirect to='/signup' />
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="username">Username</label>
              <input
                type="text"
                value={this.state.username}
                onChange={this.handleUsernameChange}
                name="username" />
            <label htmlFor="password">Password</label>
              <input
                type="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
                name="password" />
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }
};

export default Login;

