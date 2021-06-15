import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
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
  const x_two=[];
  const y_two=[];
  console.log(props);
  if(props.model_type==="regression") {
    pushAll("MAE",props.metadata.mean_absolute_error.toFixed(2), rows, x, y);
    pushAll("MSE",props.metadata.mean_squared_error.toFixed(2), rows, x, y);
    pushAll("RMSE",props.metadata.root_mean_squared_error.toFixed(2), rows, x, y);
    pushAll("RMSLE",props.metadata.root_mean_squared_log_error.toFixed(2), rows, x_two, y_two);
    pushAll("R^2",props.metadata.Coefficient_of_Determination.toFixed(2), rows, x_two, y_two);
    pushAll("Adjusted R^2",props.metadata.Adjusted_r_squared.toFixed(2), rows, x_two, y_two);

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
    <div className="col">

      <div className="row">
        <Details
          area={1}
          name={props.name}
          model_type={props.model_type}
          date_created={props.date_created}
          datasetinfo={props.datasetinfo}
          modelinfo={props.modelinfo}
        />
      </div>

      <div className="row">
        {props.model_type === "regression" ? (
          <>
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
              <Plot
                data={[
                  {type: 'bar', x: x_two, y: y_two},
                ]}
                layout={ {width: 500, height: 375, title: 'Evaluation Metrics'} }
                config={ {
                  scrollZoom:true,
                  respnsive:true
                } }
              />
            </div>
          </>
        ) : (
          <Plot
            data={[
              {type: 'bar', x: x, y: y},
            ]}
            layout={ {width: 600, height: 450, title: 'Evaluation Metrics'} }
            config={ {
              scrollZoom:true,
              respnsive:true
            } }
          />
        )}
      </div>
      <div className="row">
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
  );
}
