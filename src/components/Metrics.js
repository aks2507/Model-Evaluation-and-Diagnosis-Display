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

export default function Metrics(props){
  const rows = [];
  console.log(props);
  if(props.model_type==="regression") {
    rows.push(createData("MAE",props.metadata.mean_absolute_error));
    rows.push(createData("MSE",props.metadata.mean_squared_error));
    rows.push(createData("RMSE",props.metadata.root_mean_squared_error));
    rows.push(createData("RMSLE",props.metadata.root_mean_squared_log_error));
    rows.push(createData("R^2",props.metadata.Coefficient_of_Determination));
    rows.push(createData("Adjusted R^2",props.metadata.Adjusted_r_squared));
  }
  else {
    rows.push(createData("Accuracy",props.metadata.accuracy_score));
    rows.push(createData("Precision Score",props.metadata.precision_score));
    rows.push(createData("Recall",props.metadata.recall));
    rows.push(createData("F1-Score",props.metadata.f1_score));
    rows.push(createData("Log-Loss",props.metadata.log_loss));
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
