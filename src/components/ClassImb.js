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

export default function ClassImb(props){
  const labels=props.output_label;
  let counts={};
  for(let i=0;i<labels.length;i++)
  {
      counts[labels[i]]=(counts[labels[i]] || 0) +1;
  }
  console.log(counts);
  const x=[];
  const y=[];
  for (const [key, value] of Object.entries(counts)) {
    console.log(`${key}: ${value}`);
    x.push(parseInt(key));
    y.push(value);
 }
 console.log(typeof x[0]);
 console.log(y);
 console.log(x);
  const classes = useStyles();
  return(
    <div>

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
        <div>
            <Plot
                data = {[{
                    values: y,
                    labels: x,
                    type: 'pie'
                  }]}
                  layout={ {width: 500, height: 375, title: 'Class Imbalance'} }
                  config={ {
                    scrollZoom:true,
                    respnsive:true
                  } }
            />

        </div>
     
      </div>

  );
}
