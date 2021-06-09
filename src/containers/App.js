import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Homepage from '../pages/Homepage';
import EvalForm from '../pages/EvalForm';
import Evaluation from '../pages/Evaluation';

class App extends Component{
  render(){
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/evaluate" component={EvalForm} />
            <Route exact path="/test" component={Evaluation} />
          </Switch>
        </Router>
    );
  }
}

export default App;
