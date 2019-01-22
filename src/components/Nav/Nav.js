import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';

export default class Nav extends Component {
  render () {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">OOD Tracker</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link" to="/dashboard">Dashboard</Link>
            <Link className="nav-item nav-link" to="/login">Log In</Link>
            <Link className="nav-item nav-link" to="/signup">Sign Up</Link>
          </div>
        </div>
      </nav>
    );
  }
}