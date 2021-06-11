import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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



function createData(metric, value) {
  return { metric, value };
}
function pushAll(metric, value, rows, x, y) {
  rows.push(createData(metric,value));
  y.push(value);
  x.push(metric);
}

export default function ROC_Prec_Recall(props){
  const x = props.x;
  const y = props.y;
  // console.log(props);

  let plot_title = props.curve === 0 ? "ROC Curve":"Precision-Recall Curve";

  const classes = useStyles();
  return(
    <div>
      <div className="row">
        <Details
          area={0}
          name={props.name}
          model_type={props.model_type}
          date_created={props.date_created}
          area_under_curve={props.auc}
        />
      </div>

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
