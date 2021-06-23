import React from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Plot from 'react-plotly.js';
import Box from '@material-ui/core/Box';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',
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
    const [cutoff,setCutoff]=React.useState(0);
    const handleSliderChangeX = (e) => {
        let chart_x_val = [];
        let chart_y_val = [];
        
        console.log(e);
        for(let i=0;i<x.length;i++){
            let val_x = props.x[i] - e.step.value < 0 ? 0 : props.x[i] - e.step.value;
            let val_y = props.y[i] - e.step.value < 0 ? 0 : props.y[i] - e.step.value;
            chart_x_val.push(val_x);
            chart_y_val.push(val_y);
        }
        setX(chart_x_val);
        setY(chart_y_val);
        setCutoff(e.step.value);
    }

    const handleBeginClick = (e) => {
        setX(props.x);
        setY(props.y);
        setCutoff(0);
    };

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

    let updatemenus = [{
        x: 0,
        y: 0,
        yanchor: 'top',
        xanchor: 'left',
        showactive: false,
        direction: 'left',
        type: 'buttons',
        pad: {t: 87, r: 10},
        buttons: [{
            method: 'skip',
            label: 'Reset',
        }]
    }];

    let steps = [];
    for(let i=0;i<1;i+=0.01){
        steps.push({
            method:'skip',
            label: cutoff,
            value: i.toFixed(2),
        })
    }

    let slider = [
      {
        pad: {t: 30},
        len: 0.5,
        x: 0.5,
        currentvalue: currentvalue,
        steps: steps,
        tickcolor: 'white',
        font: {
          color: 'white'
        },
        
    }]
    
    return(

   
        <div className="row">

            
            <div className="col">
                <Box ml={7}>
                    <Plot className={classes.plot}
                        data={[
                            {type: 'scatter', x: x, y: y},
                        ]}
                        layout={ {
                            width: 500, 
                            height: 505, 
                            title: plot_title,
                            align:'right', 
                            sliders:slider,
                            updatemenus:updatemenus
                        } }
                        config={ {
                            scrollZoom:true,
                            respnsive:true
                        } }
                        
                        onButtonClicked={handleBeginClick}
                        onSliderChange={handleSliderChangeX}
                    />
                </Box>
            </div>

            <div className="col">
                    <Box pt={23}>
                    <TableContainer className={classes.root} component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Model Name</StyledTableCell>
                            <StyledTableCell align="right">AUC</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={props.name}>
                            <StyledTableCell component="th" scope="row">
                                {props.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{auc}</StyledTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
                    </Box>
            </div>
             
        </div>    
    

    );
}
