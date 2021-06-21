import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Plot from 'react-plotly.js';

const useStyles = makeStyles({
    plot:{
          justifyContent: 'center',
          alignItems: 'center',
    },
  });

export default function Plots(props){
    const classes = useStyles();
    return(
        <div className={classes.plot}>
            <Plot

                data={props.data}
                layout={ {width: props.width, height: props.height, title: props.title} }
                config={ {
                    scrollZoom:true,
                    respnsive:true
                } }
            />
        </div>
    );
}