import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Plot from 'react-plotly.js';

import Details from './Details';
import SwipeableViews from 'react-swipeable-views';

const useStyles = makeStyles({
  plot: {
    width:"90%",
    margin:"auto",
    alignItems: "center",
    justifyContent: "center",
  },
});


export default function Confusion_matrix(props){
  let z = props.cmatrix;
  const x = [];
  const y = [];
  let i;
  for(i=0;i<props.cmatrix.length;i++)
  {
    let k = props.cmatrix.length - i - 1;
    let c2 = "Class: "+k;
    x.push(c2);
    y.push(c2);
  }
  x.reverse();
  var n=z.length;
  var m=z.length;
  let cmatrix=[];
  for(i=0;i<n;i++){
    var k=[];
    for(let j=0;j<m;j++) k.push(0);
    cmatrix.push(k);
  }

  var n=z.length;
  var m=z.length;
  for(i=0;i<n;i++)
  {
    for(var j=0;j<m;j++)
    {
      cmatrix[i][j]=z[n-i-1][j];
    }
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
        <Plot className={classes.plot}
          data={[
            {type: 'heatmap', x: x, y: y, z: cmatrix},
          ]}
          layout={ {width: 500, height: 375, title: "Confusion Matrix"} }
          config={ {
            scrollZoom:true,
            respnsive:true
          } }
        />
      </div>

    </div>
  );
}
