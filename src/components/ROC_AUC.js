import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Plot from 'react-plotly.js';

import Details from './Details';

const useStyles = makeStyles({
  plot: {
    width:"90%",
    margin:"auto",
    alignItems: "center",
    justifyContent: "center",
  },
});



function createData(metric, value) {
  return { metric, value };
}
function pushAll(metric, value, rows, x, y) {
  rows.push(createData(metric,value));
  y.push(value);
  x.push(metric);
}

export default function ROC_AUC(props){
  const x = props.fpr;
  const y = props.tpr;
  console.log(props);

  const classes = useStyles();
  return(
    <div>
      <div className="row">
        <Details
          area={0}
          name={props.name}
          model_type={props.model_type}
          date_created={props.date_created}
          area_under_curve={props.auc}
        />
      </div>

      <div className="row">
        <Plot className={classes.plot}
          data={[
            {type: 'scatter', x: x, y: y},
          ]}
          layout={ {width: 500, height: 375, title: 'ROC-AUC Curve'} }
        />
      </div>

    </div>
  );
}
