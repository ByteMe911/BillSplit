import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    this.signupClick = this.signupClick.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

  }
  componentDidMount() {
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
  }
  handleUsernameChange(event) {
    this.setState({username: event.target.value});
    console.log("username is:", this.state.username);
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
    console.log("password is:", this.state.password);
  }
  /*handleSubmit(event) {
  console.log("inside search")

    $.post('http://localhost:3000/login',
    {username : this.state.username + ':'+this.state.password},
    function(data, status) {
      console.log('status', status);
      console.log('data', data); });
      this.setState({items: data});
      // TODO
    alert('A user was submitted: ' + this.state.username);
    alert('A pw was submitted: ' + this.state.password);
    // search(this.state.username,this.state.password);
    // event.preventDefault();
  }*/

  handleSignup() {
    console.log('from handle signup');
    ReactDOM.render(<Signup />, document.getElementById('app'));
  }

  handleLogin() {
    console.log('from handle login');
    ReactDOM.render(<CreateEvent />, document.getElementById('app'));
  }

  signupClick() {
  console.log("I am in signupclick");
  <Route path="/about" component={About} />
}
  search (uname) {
  console.log("inside search")
    $.post('http://localhost:3000/items',
    {username : uname},
    function(data, status) {
      console.log('status', status);
      console.log('data', data); });
      this.setState({items: data});
      // TODO
    }
  render () {
    return (
      <div>
        <img src='https://i.imgur.com/mNYadAJ.jpg' align="middle"></img>
        <Router>
      <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/createEvent">Events</Link>
        </li>
      </ul>
      <Route exact path="/" component={Login} />
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
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'));






  /*<h1>BillSplit</h1>
      <h2> Login </h2>
      <List items={this.state.items}/>
      <form onSubmit={this.handleSubmit}>
        <label>
          UserName:
          <input type="text" username={this.state.value} onChange={this.handleUsernameChange} />
        </label>
        <label>
          Password:
          <input type="text" password={this.state.value} onChange={this.handlePasswordChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <button onClick={this.handleSignup} >Create New Account</button>*/
