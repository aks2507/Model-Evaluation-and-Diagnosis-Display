import React from 'react';
import Plot from 'react-plotly.js';

// import Details from './Details';

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
            <Plot
                data = {[{
                    values: y,
                    labels: x,
                    type: 'pie'
                  }]}
                  layout={ {width: 500, height: 375, title: 'Class Imbalance'} }
                  config={ {
                    scrollZoom:true,
                    respnsive:true
                  } }
            />

        </div>
     
      </div>

  );
}
