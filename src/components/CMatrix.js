import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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


export default function ROC_Prec_Recall(props){
  const z = props.cmatrix;
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
  // console.log(props);
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
            {type: 'heatmap', x: x, y: y, z: z},
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
