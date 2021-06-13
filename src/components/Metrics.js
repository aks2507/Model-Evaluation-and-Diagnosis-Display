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
  table: {
    width:"90%",
    margin:"auto",
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

export default function Metrics(props){
  const rows = [];
  const x =[];
  const y= [];
  console.log(props);
  if(props.model_type==="regression") {
    pushAll("MAE",props.metadata.mean_absolute_error.toFixed(2), rows, x, y);
    pushAll("MSE",props.metadata.mean_squared_error.toFixed(2), rows, x, y);
    pushAll("RMSE",props.metadata.root_mean_squared_error.toFixed(2), rows, x, y);
    pushAll("RMSLE",props.metadata.root_mean_squared_log_error.toFixed(2), rows, x, y);
    pushAll("R^2",props.metadata.Coefficient_of_Determination.toFixed(2), rows, x, y);
    pushAll("Adjusted R^2",props.metadata.Adjusted_r_squared.toFixed(2), rows, x, y);

  }
  else {
    pushAll("Accuracy",props.metadata.accuracy_score.toFixed(2), rows, x, y);
    pushAll("Precision Score",props.metadata.precision_score.toFixed(2), rows, x, y);
    pushAll("Recall",props.metadata.recall.toFixed(2), rows, x, y);
    pushAll("F1-Score",props.metadata.f1_score.toFixed(2), rows, x, y);
    pushAll("Log-Loss",props.metadata.log_loss.toFixed(2), rows, x, y);
  }
  const classes = useStyles();
  return(
    <div>

      <div className="row">
        <Details
          area={1}
          name={props.name}
          model_type={props.model_type}
          date_created={props.date_created}
        />
      </div>

      <div className="row">

        <div className="col">
          <Plot
            data={[
              {type: 'bar', x: x, y: y},
            ]}
            layout={ {width: 500, height: 375, title: 'Evaluation Metrics'} }
            config={ {
              scrollZoom:true,
              respnsive:true
            } }
          />

        </div>

        <div className="col">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.metric}>
                    <TableCell align="center">{row.metric}</TableCell>
                    <TableCell align="center">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

      </div>

    </div>
  );
}
