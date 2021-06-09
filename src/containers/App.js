import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Homepage from '../pages/Homepage';
import EvalForm from '../pages/EvalForm';

class App extends Component{
  render(){
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/evaluate" component={EvalForm} />
          </Switch>
        </Router>
    );
  }
}

export default App;
