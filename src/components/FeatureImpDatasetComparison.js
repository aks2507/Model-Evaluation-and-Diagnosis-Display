import React from 'react';
import Plot from 'react-plotly.js';
import Box from '@material-ui/core/Box';

function createData(column, score) {
    return { column, score };
}

export default function FeatureImpDatasetComparison(props){
    const evalList = props.evalList;
    // console.log(evalList);
    const len = evalList.length;
    // console.log(len);
    const z = [];
    const x = [];
    const y = [];
    const trace = [];
    for(let i=0;i<len;i++){
        // console.log(evalList[i].data.dataset.name);
        z.push(evalList[i].data.dataset.name);
        y.push([]);
        x.push([]);
    }

    for(let i=0;i<len;i++){
        for(let j=0;j<evalList[i].data.metadata.feature_scores.length;j++){
            y[i].push(evalList[i].data.metadata.feature_scores[j]);
            x[i].push(evalList[i].data.dataset.metadata.columns[j]);
        }

        trace.push({
            x:x[i],
            y:y[i],
            z:z[i],
            type:'scatter3d',
            mode:'lines'
        });
    }

    let data = [...trace];
    console.log(trace);
    // console.log(x,y,z);
    return(
    <div>
        <div className="row">

            <div className="col">
                <Plot
                    data={data}
                    layout={{
                        width:600,
                        height:600,
                        title:"Feature Importances"
                    }}
                />
            </div>

            <div className="col">
                <Box m={2} pr={10}>

                </Box>
            </div>

        </div>
    </div>
    );
}
