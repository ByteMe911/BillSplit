import React from 'react';
import ReactDOM from 'react-dom';
import App from '../index.jsx'
import Dashboard from './Dashboard.jsx'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
  console.log("inside login handlesubmit")

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
  }
render () {
    return (
  <div>
  <h2>Login</h2>
<form action="/login" method="post" onSubmit={this.handleSubmit}>

      <label>Username:</label>
      <input id="username" type="text" name="username">
      </input>
      <label>Password:</label>
      <input id="password" type="password" name="password">
      </input>
      <input type="submit" value="Log in">
      </input>
</form>
</div>
);
}
}

export default Login;
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