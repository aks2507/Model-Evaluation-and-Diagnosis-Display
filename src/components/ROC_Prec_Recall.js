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
  const x = props.x;
  const y = props.y;
  // console.log(props);

  let plot_title = props.curve === 0 ? "ROC Curve":"Precision-Recall Curve";

  const classes = useStyles();
  return(
    <div>
      {/* <div className="row">
        <Details
          area={0}
          name={props.name}
          model_type={props.model_type}
          date_created={props.date_created}
          area_under_curve={props.auc}
          datasetinfo={props.datasetinfo}
          modelinfo={props.modelinfo}
        />
      </div> */}

      <div className="row">
        <Plot className={classes.plot}
          data={[
            {type: 'scatter', x: x, y: y},
          ]}
          layout={ {width: 500, height: 375, title: plot_title} }
          config={ {
            scrollZoom:true,
            respnsive:true
          } }
        />
      </div>

    </div>
  );
}
