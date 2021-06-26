import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Homepage from '../pages/Homepage';
import Evaluation from '../pages/Evaluation';
import Comparison from '../pages/Comparison';
import ModelsDatasets from '../pages/ModelsDatasets';
import ComparisonDatasets from '../pages/ComparisonDatasets';
// import HomepageFilter from '../pages/HomepageFilter';

class App extends Component{
  render(){
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/addeval" component={ModelsDatasets} />
            <Route exact path="/evaluationReport/:eval_id" component={Evaluation} />
            <Route exact path="/comparison/:eval_ids" component={Comparison} />
            <Route exact path="/comparisonDatasets/:eval_ids" component={ComparisonDatasets} />
            {/* <Route exact path="/test" component={HomepageFilter} /> */}
          </Switch>
        </Router>
    );
  }
}

export default App;
