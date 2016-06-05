import React from 'react';
import { Link } from 'react-router';

export default class SignIn extends React.Component {

  render() {
    return (
      <div>
        <h1>Sign in page</h1>
        <p><Link to='/'>to home</Link></p>
      </div>
    );
  }

}
