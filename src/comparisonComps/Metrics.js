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
  plot:{
        justifyContent: 'center',
        alignItems: 'center',
  },
});



function createDataRegression(evalName, mae, mse, rmse, rmsle, r2, ar2) {
  return { evalName, mae, mse, rmse, rmsle, r2, ar2 };
}

function createDataClassification(evalName, acc, prec, recall, f1, logloss) {
    return { evalName, acc, prec, recall, f1, logloss };
}

function pushAll(metric, value, x, y) {
  y.push(value);
  x.push(metric);
}

export default function Metrics(props){
    let evalList = props.evaluations;
    let numTabs = evalList.length;
    console.log(props.evaluations);
  const rows = [];
  const x =[];
  const y= [];

  for(let i=0;i<numTabs;i++)
  {
      x.push([]);
      y.push([]);
  }

  
    if(evalList[0].data.model_type==="regression") {
        console.log("regression");
        for(let i=0;i<numTabs;i++){
            let mae = evalList[i].data.metadata.mean_absolute_error.toFixed(2);
            let mse = evalList[i].data.metadata.mean_squared_error.toFixed(2);
            let rmse = evalList[i].data.metadata.root_mean_squared_error.toFixed(2);
            let rmsle = evalList[i].data.metadata.root_mean_squared_log_error.toFixed(2);
            let r2 = evalList[i].data.metadata.Coefficient_of_Determination.toFixed(2);
            let ar2 = evalList[i].data.metadata.Adjusted_r_squared.toFixed(2);
            pushAll("MAE",mae, x[i],y[i]);
            pushAll("MSE",mse, x[i],y[i]);
            pushAll("RMSE",rmse, x[i],y[i]);
            pushAll("RMSLE",rmsle, x[i],y[i]);
            pushAll("R^2",r2, x[i],y[i]);
            pushAll("Adjusted R^2",ar2, x[i],y[i]);
            rows.push(createDataRegression(evalList[i].data.name,mae,mse,rmse,rmsle,r2,ar2));
        }
    
    }
    else if(evalList[0].data.model_type==="classification") {
        console.log("classification");
        for(let i=0;i<numTabs;i++)
        {
            let acc = evalList[i].data.metadata.accuracy_score.toFixed(2);
            let prec = evalList[i].data.metadata.precision_score.toFixed(2);
            let recall = evalList[i].data.metadata.recall.toFixed(2);
            let f1 = evalList[i].data.metadata.f1_score.toFixed(2);
            let ll = evalList[i].data.metadata.log_loss.toFixed(2);
            pushAll("Accuracy",acc, x[i],y[i]);
            pushAll("Precision Score",prec, x[i],y[i]);
            pushAll("Recall",recall, x[i],y[i]);
            pushAll("F1-Score",f1, x[i],y[i]);
            pushAll("Log-Loss",ll, x[i],y[i]);
            rows.push(createDataClassification(evalList[i].data.name,acc, prec, recall, f1, ll));
        }
        
    }
  let trace = [];
  for(let i=0;i<numTabs;i++)
  {
    trace.push({x:x[i],y:y[i],type:'bar',name:evalList[i].data.name});
  }
  let data = [...trace]

  const classes = useStyles();
  return(
    <div className="col">

        <div className="row">
            <Details
                evaluations={evalList}
            />
        </div>
        <div className="row">
            <div className={classes.plot}>
                <Plot

                data={data}
                layout={ {width: 600, height: 450, title: 'Evaluation Metrics'} }
                config={ {
                    scrollZoom:true,
                    respnsive:true
                } }
                />
            </div>
        </div>
        

    </div>
  );
}
