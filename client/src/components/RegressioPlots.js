import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Plot from 'react-plotly.js';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',
    align: 'right',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  plot: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '80%',
  },
}));

export default function RegressionPlots(props) {
  const [x, setX] = React.useState(props.x);
  const [y, setY] = React.useState(props.y);
  const [cutoff, setCutoff] = React.useState(0);
  const handleSliderChangeX = (e) => {
    let chart_x_val = [];
    let chart_y_val = [];

    console.log(e);
    for (let i = 0; i < x.length; i++) {
      let val_x = props.x[i] - e.step.value < 0 ? 0 : props.x[i] - e.step.value;
      let val_y = 0;
      if (props.y[i] >= 0)
        val_y = props.y[i] - e.step.value < 0 ? 0 : props.y[i] - e.step.value;
      else if (props.y[i] < 0)
        val_y =
          Number(props.y[i]) + Number(e.step.value) > 0
            ? 0
            : Number(props.y[i]) + Number(e.step.value);
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

  let plot_title = props.title;
  const classes = useStyles();
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
  let mindiv = (Math.max(...props.x) - Math.min(...props.x)) / 100;
  for (let i = 0; i < Math.max(...props.x); i += mindiv) {
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
    <div className="col">
      <Box ml={7}>
        <Plot
          className={classes.plot}
          data={[{ mode: 'markers', type: 'scatter', x: x, y: y }]}
          layout={{
            title: plot_title,
            align: 'right',
            sliders: slider,
            updatemenus: updatemenus,
            xaxis: {title: props.xlabel},
            yaxis: {title: props.ylabel}
          }}
          config={{
            scrollZoom: true,
            respnsive: true,
          }}
          onButtonClicked={handleBeginClick}
          onSliderChange={handleSliderChangeX}
        />
      </Box>
    </div>
  );
}
