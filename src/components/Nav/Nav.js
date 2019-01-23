import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './nav.scss';

export default class Nav extends Component {

  signOut() {
    axios.get('/api/signout')
    .then(() => {
      alert("Signing out...");
      this.props.setGlobal({user: {}});
    })
    .catch(() => {
      alert("Sign Out failed");
    });
  }

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
            {this.props.globals && this.props.globals.user._id?(
              <Link className="nav-item nav-link" to="#" onClick={this.signOut.bind(this)}>Sign Out</Link>
            ):(
              <Link className="nav-item nav-link" to="/signin">Sign In</Link>
            )}
            <Link className="nav-item nav-link" to="/signup">Sign Up</Link>
          </div>
        </div>
      </nav>
    );
  }
}