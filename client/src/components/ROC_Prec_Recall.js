import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Plot from 'react-plotly.js';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    align: 'right',
  },
  table: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  plot: {
    width: '500px',
    height: '500px',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function ROC_Prec_Recall(props) {
  const [x, setX] = React.useState(props.x);
  const [y, setY] = React.useState(props.y);
  const [cutoff, setCutoff] = React.useState(0);
  const handleSliderChangeX = (e) => {
    let chart_x_val = [];
    let chart_y_val = [];

    console.log(e);
    for (let i = 0; i < x.length; i++) {
      let val_x = props.x[i] - e.step.value < 0 ? 0 : props.x[i] - e.step.value;
      let val_y = props.y[i] - e.step.value < 0 ? 0 : props.y[i] - e.step.value;
      chart_x_val.push(val_x);
      chart_y_val.push(val_y);
    }
    setX(chart_x_val);
    setY(chart_y_val);
    setCutoff(e.step.value);
  };

  const handleBeginClick = (e) => {
    setX(props.x);
    setY(props.y);
    setCutoff(0);
  };
  var auc = props.auc.toFixed(2);
  let plot_title =
    props.curve === 0
      ? 'ROC Curve( AUC = ' + auc + ')'
      : 'Precision-Recall Curve( AUC = ' + auc + ')';
  const classes = useStyles();

  let xaxis={};
  let yaxis={};
  props.curve===0?(
    xaxis={title:'TPR'},
    yaxis={title:'FPR'}
  ):(
    xaxis={title:'Recall'},
    yaxis={title:'precision'}
  );
  let currentvalue = {
    xanchor: 'right',
    prefix: 'cutoff: ',
    font: {
      color: '#888',
      size: 20,
    },
  };

  let updatemenus = [
    {
      x: 0,
      y: 0,
      yanchor: 'top',
      xanchor: 'left',
      showactive: false,
      direction: 'left',
      type: 'buttons',
      pad: { t: 87, r: 10 },
      buttons: [
        {
          method: 'skip',
          label: 'Reset',
        },
      ],
    },
  ];

  let steps = [];
  for (let i = 0; i < 1; i += 0.01) {
    steps.push({
      method: 'skip',
      label: cutoff,
      value: i.toFixed(2),
    });
  }

  let slider = [
    {
      pad: { t: 30 },
      len: 0.5,
      x: 0.5,
      currentvalue: currentvalue,
      steps: steps,
      tickcolor: 'white',
      font: {
        color: 'white',
      },
    },
  ];

  return (
    <Plot
      className={classes.plot}
      data={[{ type: 'scatter', x: x, y: y }]}
      layout={{
        title: plot_title,
        xaxis:xaxis,
        yaxis:yaxis,
        align: 'center',
        sliders: slider,
        updatemenus: updatemenus,
      }}
      config={{
        scrollZoom: true,
        responsive: true,
      }}
      onButtonClicked={handleBeginClick}
      onSliderChange={handleSliderChangeX}
    />
  );
}
