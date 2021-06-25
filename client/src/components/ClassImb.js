import React from 'react';
import Plot from 'react-plotly.js';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  plot: {
      width: '90%',
      height: '90%',
      justifyContent:'center',
      alignItems: 'center',
  },
}));

export default function ClassImb(props){
  const classes=useStyles();
  const labels=props.output_label;
  let counts={};
  for(let i=0;i<labels.length;i++)
  {
      counts[labels[i]]=(counts[labels[i]] || 0) +1;
  }

  const x=[];
  const y=[];
  for (const [key, value] of Object.entries(counts)) {
    x.push(parseInt(key));
    y.push(value);
 }

  return(
    <div>
      <div>
        <Plot className={classes.plot}
          data = {[{
              values: y,
              labels: x,
              type: 'pie',
              hoverinfo: 'label+percent',
              textinfo: 'none'
            }]}
          layout={{title: 'Class Imbalance'}}
          config={ 
            {
              scrollZoom:true,
              responsive:true
            }
          }
        />
      </div>
    </div>

  );
}
