import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Signup from './components/Signup.jsx';
import List from './components/List.jsx';

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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signupClick = this.signupClick.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/items',
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

  handleSubmit(event) {
  console.log("inside search")
    $.post('http://localhost:3000/items',
    {username : this.state.username + ':'+this.state.password},
    function(data, status) {
      console.log('status', status);
      console.log('data', data); });
      this.setState({items: data});
      // TODO
    //alert('A user was submitted: ' + this.state.username);
    //alert('A pw was submitted: ' + this.state.password);
    //search(this.state.username,this.state.password);
    //event.preventDefault();
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
    return (<div>
      <h1>BillSplit</h1>
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
      <Router>
      <p>

  <Link to="/Signup">Create New Account</Link>

<Route path="/Signup" component={Signup} />
</p>
</Router>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
