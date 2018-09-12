import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import { Switch } from 'react-router-dom';
import $ from 'jquery';
import Dashboard from './components/Dashboard.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import List from './components/List.jsx';
import CreateEvent from './components/CreateEvent.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      username: '',
      password: ''
    };
    /*this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    this.signupClick = this.signupClick.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);*/

  }
  /*componentDidMount() {
    $.ajax({
      url: '/login',
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }*/



  /*handleUsernameChange(event) {
    this.setState({username: event.target.value});
    console.log("username is:", this.state.username);
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
    console.log("password is:", this.state.password);
  }


  handleSignup() {
    console.log('from handle signup');
    ReactDOM.render(<Signup />, document.getElementById('app'));
  }

  handleLogin() {
    console.log('from handle login');
    ReactDOM.render(<Dashboard />, document.getElementById('app'));
  }

  signupClick() {
  console.log("I am in signupclick");
  <Route path="/about" component={About} />
}*/

  render () {
    return (
      <div>
        <img src='https://i.imgur.com/mNYadAJ.jpg' align="middle"></img>
        <Router>
      <div>
      <ul>
        <li>
          <Link to="/Login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
        <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/createEvent">Create Event</Link>
        </li>
      </ul>
      <Route exact path="/Login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/createEvent" component={CreateEvent} />
    </div>
  </Router>

    </div>
    )
  }
}

ReactDOM.render((
  <Router>
    <App />
  </Router>
), document.getElementById('app'));





