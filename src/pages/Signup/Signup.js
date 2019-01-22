import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Signup extends Component {
  render () {
    return (
      <div>
        <h1>Sign Up</h1>
        <br/>
        <form>
          <label>Username</label>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">@</span>
            </div>
            <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <label>Password</label>
          <div className="input-group mb-3">
            <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"/>
          </div>
          <label>Confirm Password</label>
          <div className="input-group mb-3">
            <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
            <input type="submit" className="btn btn-success"/>
          </div>
        </form>
        <p>Already have an account? <Link to="/login">Login here</Link>.</p>
      </div>
    );
  }
}