import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        username: "",
        password: "",
        password2: ""
      },
      res: null
    };
  }

  handleChange(e) {
    let data = this.state.data;
    data[e.target.name] = e.target.value;
    this.setState({data});
  }

  statusToJSX() {
    if (!this.state.res) {
      return "";
    }

    return (
      <div className={this.state.res.class}>
        {this.state.res.message}
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = this.state.data;
    if (data.password !== data.password2) {
      return this.setState({class: "alert alert-danger", message: "Your passwords do not match. Please try again."});
    } else if (data.password.length < 8) {
      return this.setState({class: "alert alert-danger", message: "Passwords must be at least 8 characters long"});
    }
    this.setState({class: "", message: ""});

    axios.post('/api/adduser', {username: data.username, password: data.password})
    .then((res) => {
      res.data.message = (<>Your account was created. <Link to="/signin">Sign In</Link> to view your dashboard.</>);
      this.setState({res: res.data});
      this.props.setGlobal({user: res.data.username});
    })
    .catch((err) => {
      this.setState({res: err.response.data});
    });
  }

  render () {
    return (
      <div>
        <h1>Sign Up</h1>
        <br/>
        {this.statusToJSX()}
        <form onSubmit={this.handleSubmit.bind(this)} method="POST">
          <label>Username</label>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">@</span>
            </div>
            <input 
              className="form-control"
              type="text"
              placeholder="Enter Username"
              name="username"
              value={this.state.data?this.state.data.username:""}
              onChange={this.handleChange.bind(this)}
            />
          </div>

          <label>Password</label>
          <div className="input-group mb-3">
            <input 
              className="form-control"
              type="password"
              placeholder="Enter Password"
              name="password"
              value={this.state.data?this.state.data.password:""}
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <label>Confirm Password</label>
          <div className="input-group mb-3">
            <input 
              className="form-control"
              type="password"
              placeholder="Enter Password"
              name="password2"
              value={this.state.data?this.state.data.password2:""}
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <div className="input-group mb-3">
            <input type="submit" className="btn btn-success"/>
          </div>
        </form>
        <p>Already have an account? <Link to="/signin">Sign In here</Link>.</p>
      </div>
    );
  }
}