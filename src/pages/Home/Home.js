import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.scss';

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1 className="text-center">
          Out Of Date Tracker
        </h1>
        <p>Easily keep track of out of date dairy or other product. Add, edit or remove product as necessary. :)</p>
        <div className="row justify-content-center">
          <Link className="btn btn-success" to="/signup">Sign Up</Link>
          <Link className="btn btn-primary" to="/signin">Sign In</Link>
        </div>
      </div>
    );
  }
}