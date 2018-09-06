import React from 'react';
import ReactDOM from 'react-dom';
import App from '../index.jsx'
import Dashboard from './Dashboard.jsx'

const Signup = (props) => (
  <div>
  <h2>Sign up</h2>
<form action="/signup" method="post">

      <label>Username:</label>
      <input id="username" type="text" name="username">
      </input>
      <label>Password:</label>
      <input id="password" type="password" name="password">
      </input>
      <input type="submit" value="Sign up">
      </input>
</form>
</div>
);

export default Signup;