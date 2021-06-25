import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Details from './Details';
import CompareTable from './CompareTable';
import Plots from './Plots';
import {Grid, Paper} from '@material-ui/core';
const useStyles = makeStyles({
  table: {
    width:"90%",
    margin:"auto",
  },
  plot:{
        height:'80%',
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
  },
});

function createDataRegression(evalName, mae, mse, rmse, rmsle, r2, ar2){
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
 
    const rows = [];
    const x = [];
    const y = [];
    const x_one =[];
    const x_two =[];
    const y_one =[];
    const y_two =[];

    for(let i=0;i<numTabs;i++)
    {
        if(evalList[0].data.model_type==="regression"){
            x_one.push([]);
            y_one.push([]);
            x_two.push([]);
            y_two.push([]);
        }
        else{
            x.push([]);
            y.push([]);
        }
    }

  
    if(evalList[0].data.model_type==="regression") {
    
        for(let i=0;i<numTabs;i++){
            let mae = evalList[i].data.metadata.mean_absolute_error.toFixed(2);
            let mse = evalList[i].data.metadata.mean_squared_error.toFixed(2);
            let rmse = evalList[i].data.metadata.root_mean_squared_error.toFixed(2);
            let rmsle = evalList[i].data.metadata.root_mean_squared_log_error.toFixed(2);
            let r2 = evalList[i].data.metadata.Coefficient_of_Determination.toFixed(2);
            let ar2 = evalList[i].data.metadata.Adjusted_r_squared.toFixed(2);
            pushAll("MAE",mae, x_one[i],y_one[i]);
            pushAll("MSE",mse, x_one[i],y_one[i]);
            pushAll("RMSE",rmse, x_one[i],y_one[i]);
            pushAll("RMSLE",rmsle, x_two[i],y_two[i]);
            pushAll("R^2",r2, x_two[i],y_two[i]);
            pushAll("Adjusted R^2",ar2, x_two[i],y_two[i]);
            rows.push(createDataRegression(evalList[i].data.name,mae,mse,rmse,rmsle,r2,ar2));
        }
    
    }
    else if(evalList[0].data.model_type==="classification") {
      
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
    let data, linedata, data_one, data_two, linedata_one, linedata_two;
    if(evalList[0].data.model_type==="regression"){
        let bartrace_one = [];
        let linetrace_one = [];
        let bartrace_two = [];
        let linetrace_two = [];
        for(let i=0;i<numTabs;i++)
        {
            bartrace_one.push({x:x_one[i],y:y_one[i],type:'bar',name:evalList[i].data.name});
            bartrace_two.push({x:x_two[i],y:y_two[i],type:'bar',name:evalList[i].data.name});
        }
        data_one = [...bartrace_one]
        data_two = [...bartrace_two]

        for(let i=0;i<numTabs;i++)
        {
            linetrace_one.push({x:x_one[i],y:y_one[i],type:'scatter',name:evalList[i].data.name});
            linetrace_two.push({x:x_two[i],y:y_two[i],type:'scatter',name:evalList[i].data.name});
        }
        linedata_one = [...linetrace_one]
        linedata_two = [...linetrace_two]
    }
    else{
        let bartrace = [];
        let linetrace = [];
        for(let i=0;i<numTabs;i++)
        {
            bartrace.push({x:x[i],y:y[i],type:'bar',name:evalList[i].data.name});
        }
        data = [...bartrace]
        
        for(let i=0;i<numTabs;i++)
        {
            linetrace.push({x:x[i],y:y[i],type:'scatter',name:evalList[i].data.name});
        }
        linedata = [...linetrace]
    }
    

  const classes = useStyles();
 
  return(
    <Grid container spacing={2}>

        <Grid item xs={12}>
            <Paper elevation={5}>
                <Details
                    c={1}
                    evaluations={evalList}
                />
            </Paper>
        </Grid>

        <Grid item xs={12}>
            <div className={classes.plot}>
                <CompareTable
                    rows={rows}
                    model_type={evalList[0].data.model_type}
                />
            </div>
        </Grid>

        {evalList[0].data.model_type === "regression" ? (
            <Grid container xs={12} spacing={2}>
                
                <Grid item xs={12} sm={6}>
                    <Paper elevation={5}>
                        <Plots data={data_one} title="Evaluation Metrics"/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={5}>
                        <Plots data={data_two} title="Evaluation Metrics"/>
                    </Paper>
                </Grid>
                
                
                <Grid item xs={12} sm={6}>
                    <Paper elevation={5}>
                        <Plots data={linedata_one} title="Evaluation Metrics"/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={5}>
                        <Plots data={linedata_two} title="Evaluation Metrics"/>
                    </Paper>
                </Grid>
                
            </Grid>
        ) : (
            
            <Grid container xs ={12} spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={5}>
                        <Plots data={data} title="Evaluation Metrics"/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={5}>
                        <Plots data={linedata} title="Evaluation Metrics"/>
                    </Paper>
                </Grid>
            </Grid>
        )}
    </Grid>
  );
}
