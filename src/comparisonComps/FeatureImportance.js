import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Plot from 'react-plotly.js';
//Components
import Details from './Details';
import Box from '@material-ui/core/Box';
const useStyles = makeStyles({
  table: {
    width:"90%",
    margin:"auto",
  },
  plot:{
        justifyContent: 'center',
        alignItems: 'center',
  },
});



export default function FeatureImportance(props){
    let evalList = props.evaluations;
    let numTabs = evalList.length;
    console.log(props.evaluations);
    let features=[];
    let columns=evalList[0].data.metadata.columns;
    for(let i=0;i<numTabs;i++)
    {
        features.push(evalList[i].data.metadata.feature_scores);
    }
    var traces=[];
    for(var i=0;i<numTabs;i++)
    {
        traces.push({x:columns,y:features[i],name:evalList[i].data.name,type:'bar'});
    }
    var data=[...traces]
     const classes = useStyles();
return(
    <div className="col">

    {/* <div className="row">
        <Details
            evaluations={evalList}
        />
    </div> */}
    <div className="row">
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