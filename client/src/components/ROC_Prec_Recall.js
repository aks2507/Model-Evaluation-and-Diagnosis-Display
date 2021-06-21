import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Plot from 'react-plotly.js';
import Box from '@material-ui/core/Box';
// import Details from './Details';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    align:"right"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function ROC_Prec_Recall(props){
    const [x, setX] = React.useState(props.x);
    const [y, setY] = React.useState(props.y);
    
    const handleSliderChangeX = (e) => {
        let chart_x_val = [];
        let chart_y_val = [];
        for(let i=0;i<x.length;i++){
            let val_x = props.x[i] - e.step.value < 0 ? 0 : props.x[i] - e.step.value;
            let val_y = props.y[i] - e.step.value < 0 ? 0 : props.y[i] - e.step.value;
            chart_x_val.push(val_x);
            chart_y_val.push(val_y);
        }
        setX(chart_x_val);
        setY(chart_y_val);
    }

    let plot_title = props.curve === 0 ? "ROC Curve":"Precision-Recall Curve";
    const classes = useStyles();
    var auc=props.auc.toFixed(2);
    let currentvalue = {
        xanchor: 'right',
        prefix: 'cutoff: ',
        font: {
            color: '#888',
            size: 20,
        }
    };
    let steps = [];
    let div = (Math.max(...props.x) - Math.min(...props.x))/100;
    for(let i=0;i<100;i++){
        if(i<5){
            steps.push({
                method:'skip',
                label: 0,
                value: 0
            })
        }
        steps.push({
            method:'skip',
            label: (i*div + Math.min(...props.x)).toFixed(2).toString(),
            value: Math.min(...props.x) + (i*div)
        })
    }

    
    let slider = [{pad: {t: 30},
        len: 0.5,
        x: 0.5,
        currentvalue: currentvalue,
        steps: steps
    }]


    return(
    <div>

        <div className="col">
            <div className={classes.root}>
                <Box ml={8}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>Area Under Curve</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {auc}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </div>
            <div>
                <Plot className={classes.plot}
                    data={[
                        {type: 'scatter', x: x, y: y},
                    ]}
                    layout={ {width: 500, height: 405, title: plot_title,align:'right', sliders:slider} }
                    config={ {
                        scrollZoom:true,
                        respnsive:true
                    } }
                    onSliderChange={handleSliderChangeX}
                />
            </div>    
        </div>


    </div>
    );
}