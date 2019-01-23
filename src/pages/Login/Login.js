import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.scss';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      res: null
    }
  }

  handleChange(e) {
    let data = this.state.data;
    data[e.target.name] = e.target.value;
    this.setState({data});
  }

  handleSubmit(e) {
    e.preventDefault();

    axios.post("/api/signin", this.state.data)
    .then((res) => {
      this.props.setGlobal({user: res.data}, () => {
        this.props.history.push('/dashboard');
      });
    })
    .catch((err) => {
      this.setState({res: err.response.data});
    });
  }

  resToJSX() {
    if (!this.state.res) {
      return "";
    }
    return (
      <div className="alert alert-danger" role="alert">
        {this.state.res.message}
      </div>
    );
  }

  render () {
    return (
      <div>
        <h1>Sign In</h1>
        <br/>
        
        <form onSubmit={this.handleSubmit.bind(this)} method="POST">
          <label>Username</label>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">@</span>
            </div>
            <input type="text" className="form-control" placeholder="Username" name="username" value={this.state.data?this.state.data.username:""} onChange={this.handleChange.bind(this)}/>
          </div>
          <label>Password</label>
          <div className="input-group mb-3">
            <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.data?this.state.data.password:""} onChange={this.handleChange.bind(this)}/>
          </div>
          <div className="input-group mb-3">
            <input type="submit" className="btn btn-primary"/>
          </div>
        </form>
        <p>Don't have an account? <Link to="/signup">Signup here</Link>.</p>
      </div>
    );
  }
}