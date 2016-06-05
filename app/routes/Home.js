import React from 'react';
import { Link } from 'react-router';

export default class Home extends React.Component {

  render() {
    return (
      <div>
        <h1>Home page</h1>
        <p><Link to='/signin'>to sign in</Link></p>
      </div>
    );
  }

}
