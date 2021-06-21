import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Plot from 'react-plotly.js';
//Components
// import Details from './Details';
import Box from '@material-ui/core/Box';
// const useStyles = makeStyles({
//   table: {
//     width:"90%",
//     margin:"auto",
//   },
//   plot:{
//         justifyContent: 'center',
//         alignItems: 'center',
//   },
// });

import GeneralTable from './GeneralTable';

function createData(evals, features){
    return { evals, ...features };
}

export default function FeatureImportance(props){
    let evalList = props.evaluations;
    let numTabs = evalList.length;
    console.log(props.evaluations);
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
    //  const classes = useStyles();
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

    {/* <div className="row">
        <Details
            evaluations={evalList}
        />
    </div> */}
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