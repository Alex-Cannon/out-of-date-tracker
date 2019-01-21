import React, { Component } from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import './App.scss';

const ROUTES = [{
  path: '/'
}];

class App extends Component {

  /*
  getRoutes() {
    return ROUTES.map(({path, component: c}) => {
      return (
        <Route
          path={path}
          render
        />
      ); 
    });
  }*/

  render() {
    return (
      <div className="App container-fluid">
        I'm the ood tracker!
        <Router>
    {/*this.getRoutes()*/}
        </Router>
      </div>
    );
  }
}

export default App;
