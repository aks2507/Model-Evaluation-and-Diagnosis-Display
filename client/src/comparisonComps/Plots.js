import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Plot from 'react-plotly.js';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
    plot:{
          justifyContent: 'center',
          alignItems: 'center',
          width: '90%',
          height: '80%',
    },
  });

export default function Plots(props){
    const classes = useStyles();
    return(
        <Grid container xs={12}>
            <Plot
                className={classes.plot}
                data={props.data}
                layout={ {title: props.title, legend:{"orientation":"h"}} }
                config={ {
                    scrollZoom:true,
                    responsive:true
                } }
            />
        </Grid>
    );
}