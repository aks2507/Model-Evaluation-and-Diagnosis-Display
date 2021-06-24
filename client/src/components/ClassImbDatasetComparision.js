import React from 'react';
import Plot from 'react-plotly.js';
import Box from '@material-ui/core/Box';

export default function ClassImbDatasetComparision(props){
 const evalList=props.evalList;
 const dataset_title=[];
 const x=[];
 const y=[];
 for(let i=0;i<evalList.length;i++)
 {
     const label=evalList[i].data.dataset.metadata.output_label;
     let counts={};
     for(let i=0;i<label.length;i++)
     {
            counts[label[i]]=(counts[label[i]] || 0) +1;
     }

     const xx=[];
     const yy=[];
    for (const [key, value] of Object.entries(counts)) {
        xx.push(parseInt(key));
        yy.push(value);
    }
    x.push(xx);
    y.push(yy);
     const data_name=evalList[i].data.dataset.name;
     dataset_title.push(data_name);
 }

 var traces=[]
 for(let i=0;i<evalList.length;i++)
 {  
        traces.push(
        {
            values: y[i],
            labels: x[i],
            domain: {column: i},
            name: evalList[i].data.dataset.name,
            hoverinfo: 'label+percent+name',
            textinfo: 'none',
            title:evalList[i].data.dataset.name,
            type: 'pie'
        }
        );
 }

 const data1=[...traces]
  var layout = {
    title: 'Class Imbalance Comparision',
    height: 400,
    width: 250*evalList.length,
    showlegend: true,
    grid: {rows: 1, columns: evalList.length}
  };

  return(
    
    <div>
        <Box ml={10}>
            <Plot   
                data={data1}
                layout={layout}
            />
        </Box>
        

    </div>

  );
}
