import React from 'react';
import Plot from 'react-plotly.js';
import Box from '@material-ui/core/Box';


import GeneralTable from './GeneralTable';

function createData(evals, features){
    return { evals, ...features };
}

export default function FeatureImportance(props){
    let evalList = props.evaluations;
    let numTabs = evalList.length;
    let features=[];
    let columns=evalList[0].data.metadata.columns;
    for(let i=0;i<numTabs;i++)
    {
        let fscores = [];
        for(let j=0;j<columns.length;j++)
        {
            fscores.push(evalList[i].data.metadata.feature_scores[j].toFixed(4));
        }
        features.push(fscores);
    }
    let traces=[];
    let linetraces=[];
    for(let i=0;i<numTabs;i++)
    {
        traces.push({x:columns,y:features[i],name:evalList[i].data.name,type:'bar'});
        linetraces.push({x:columns,y:features[i],name:evalList[i].data.name,type:'scatter'});
    }
    let data=[...traces];
    let linedata=[...linetraces];
    const headCells = [];
    headCells.push({id:'evals',label:'Evaluation'});
    for(let i=0;i<columns.length;i++){
        headCells.push({id:i.toString(),label:columns[i]});
    }
    const rows = [];
    for(let i=0;i<numTabs;i++)
    {
        rows.push(createData(evalList[i].data.name,features[i]));
    }
    console.log(headCells,rows);

return(
    <div className="col">
    <div className="row">
        <Box m={10} pt={1}>
            <GeneralTable
                rows={rows}
                headCells={headCells}
                tabletitle="Feature Importances"
            />
        </Box>
        <Box m={10} pt={1}>
            <Plot   
                data={linedata}
                layout={ {width: 800, height: 450, title: 'Feature Importances',barmode: 'stack'} }
                config={ {
                    scrollZoom:true,
                    responsive:true
                } }
            />
        </Box>
        <Box m={10} pt={1}>
            <Plot   
                data={data}
                layout={ {width: 800, height: 450, title: 'Feature Importances',barmode: 'stack'} }
                config={ {
                    scrollZoom:true,
                    responsive:true
                } }
            />
        </Box>
        
    </div>

</div>
  );
}
