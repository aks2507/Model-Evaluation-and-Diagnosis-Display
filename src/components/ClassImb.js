import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Plot from 'react-plotly.js';
import Details from './Details';
import Box from '@material-ui/core/Box';
const useStyles = makeStyles({
  table: {
    width:"90%",
    margin:"auto",
  },
});



function createData(metric, value) {
  return { metric, value };
}


export default function ClassImb(props){
  const labels=props.output_label;
  let counts={};
  for(let i=0;i<labels.length;i++)
  {
      counts[labels[i]]=(counts[labels[i]] || 0) +1;
  }
  console.log(counts);
  const x=[];
  const y=[];
  for (const [key, value] of Object.entries(counts)) {
    // console.log(`${key}: ${value}`);
    x.push(parseInt(key));
    y.push(value);
 }
//  console.log(typeof x[0]);
//  console.log(y);
//  console.log(x);
  return(
    <div>

      <div className="row">
        {/* <Details
          area={1}
          name={props.name}
          model_type={props.model_type}
          date_created={props.date_created}
          datasetinfo={props.datasetinfo}
          modelinfo={props.modelinfo}
        /> */}
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
                    {width: 600, height: 575, title: 'Class Imbalance'}
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
