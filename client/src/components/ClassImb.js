import React from 'react';
import Plot from 'react-plotly.js';
import Box from '@material-ui/core/Box';

export default function ClassImb(props){
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

      <div className="row">
        
      </div>
        <div>
          <Box mx={11} pt={1}>
            <Plot
                data = {[{
                    values: y,
                    labels: x,
                    type: 'pie',
                    hoverinfo: 'label+percent',
                    textinfo: 'none'
                  }]}
                  layout={ 
                    {width: 400, height: 400, title: 'Class Imbalance'}
                   }
                  config={ 
                    {
                    scrollZoom:true,
                    respnsive:true
                  }
                 }
            />
          </Box>
        </div>
      </div>

  );
}
