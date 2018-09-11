import React, { Component } from 'react';


class UserInfo extends Component {
  
  constructor(props) {
  	super(props);
   }

  render() {
  	console.log(this.props.username);
    return (
    	<div>
      <user>Username</user>
      <user>{this.props.username}</user>
      </div>
    );
  }
}

export default UserInfo;
