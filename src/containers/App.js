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
import Comparison from '../pages/Comparison';
import ModelsDatasets from '../pages/ModelsDatasets';


class App extends Component{
  render(){
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/addeval" component={ModelsDatasets} />
            <Route exact path="/evaluation/:eval_id" component={Evaluation} />
            <Route exact path="/comparison/:eval_ids" component={Comparison} />
          </Switch>
        </Router>
    );
  }
}

export default App;
