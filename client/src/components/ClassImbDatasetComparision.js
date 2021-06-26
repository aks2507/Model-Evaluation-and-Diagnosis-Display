import React from 'react';
import Plot from 'react-plotly.js';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles((theme) => ({
    plot: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%',
      height: '80%',
    },
    tableContainer: {
        maxWidth: '80%'
    },
}));

export default function ClassImbDatasetComparision(props){
 const evalList=props.evalList;
 const classes = useStyles();
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
        showlegend: true,
        grid: {rows: 1, columns: evalList.length}
    };

  return(
    
    <div className={classes.tableContainer}>
        <Plot   
            className={classes.plot}
            data={data1}
            layout={layout}
            config={{responsive:true}}
        />
    </div>

  );
}
