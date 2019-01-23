import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Redirect} from 'react-router-dom';
import axios from 'axios';
import './App.scss';
import './footer.scss';
import Nav from '../Nav/Nav.js';

const ROUTES = [{
  path: '/',
  component: require('../../pages/Home/Home.js').default,
  exact: true
}, {
  path: '/signup',
  component: require('../../pages/Signup/Signup.js').default,
  exact: true
}, {
  path: '/signin',
  component: require('../../pages/Login/Login.js').default,
  exact: true
}, {
  path: '/dashboard',
  component: require('../../pages/Dashboard/Dashboard.js').default,
  exact: true,
  auth: true
}];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      ready: false
    }
  }

  componentWillMount() {
    axios.get('/api/myuser')
    .then((res) => {
      this.setState({user: res.data, ready: true});
    })
    .catch(() => {
      this.setState({ready: true});
    })
  }

  setGlobal(obj, cb) {
    this.setState(obj, cb);
  }

  getRoutes() {
    // Set each route
    return ROUTES.map(({path, component: C, exact, auth}) => {

      // Handle Auth/Non-Auth routes
      const render = auth?(props) => {
        if (this.state.user._id) {
          return (
            <ContentWrapper>
              <C {...props} setGlobal={this.setGlobal.bind(this)} globals={this.state}/>
            </ContentWrapper>
          );
        }
        return <Redirect to={"/signin"}/>;  

      // Non-Auth routes
      }: (props) => {
        return (
          <ContentWrapper>
            <C {...props} setGlobal={this.setGlobal.bind(this)} globals={this.state}/>
          </ContentWrapper>
        );
      };

      // Handle exact routes
      if (exact) {
        return (
          <Route
            key={path}
            path={path}
            render={render}
            exact
          />);
      } else {
        return (
          <Route
            key={path}
            path={path}
            render={render}
          />);
      }
    });
  }

  render() {
    if (!this.state.ready) {
      return "Loading...";
    }

    return (
      <Router>
        <PageWrapper>
          <Nav setGlobal={this.setGlobal.bind(this)} globals={this.state}/>
          {this.getRoutes()}
        </PageWrapper>
      </Router>
    );
  }
}

class PageWrapper extends Component {
  render () {
    return (
      <div className="container-fluid main-content">
        <div className="row">
          <div className="col-sm-12">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

class ContentWrapper extends Component {
  render () {
    return (
      <div className="row justify-content-center" id="login-page">
        <div className="col-sm-12 col-md-6 col-lg-4">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
