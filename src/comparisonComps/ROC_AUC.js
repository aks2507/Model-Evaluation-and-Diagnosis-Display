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

    let tpr=[];
    let fpr=[];
    let auc=[];
    console.log(evalList[0].data.metadata);
    for(let i=0;i<numTabs;i++)
    {
        var fpr_list=evalList[i].data.metadata.fpr;
        var tpr_list=evalList[i].data.metadata.tpr
        fpr.push(fpr_list);
        tpr.push(tpr_list);
        auc.push(evalList[i].data.metadata.roc_auc);
    }
    console.log(auc);
   

  
  let trace = [];
  console.log(fpr.length);
  console.log(tpr.length);
  for(let i=0;i<numTabs;i++)
  {
    trace.push({x:fpr[i],y:tpr[i],type:'scatter',name:evalList[i].data.name});
  }
  let data = [...trace]
  console.log(trace[0]);
  console.log(trace[1]);
  var curve_info=[];
  var info=[];
  var auc_=[];
  for(var i=0;i<numTabs;i++){
      info.push(evalList[i].data.name);
      auc_.push(auc[i].toFixed(2));
  }
  console.log(auc_);
  curve_info.push(info);
  curve_info.push(auc_);
  const classes = useStyles();
  return(
    <div className="col">

        <div className="row">
            <Details
                evaluations={evalList}
            />
        </div>
        <div className="row">
        <Plot   
        data={data}
        layout={ {width: 600, height: 450, title: 'ROC Curves'} }
        config={ {
            scrollZoom:true,
            responsive:true
        } }
        />
        <div>
         <Plot
        data={[
          {
    
            type: 'table',
            header:{
                values:[["<b>Models</b>"], ["<b>Area Under Curve</b>"]],
                align: "center",
                fill: {color: '#119DFF'},

            },
            cells: {
                values: curve_info,
                height:31,
                fill: {color: ['#25FEFD', 'white']},
                align: "center",
                line: {color: "black", width: 1},
                font: {family: "Arial", size: 11, color: ["black"]}
              }
          },
        ]}
        layout={ {width: 420, height: 840, title: 'Curve Information'} }
      />
        </div>
        </div>
        

    </div>
  );
}
