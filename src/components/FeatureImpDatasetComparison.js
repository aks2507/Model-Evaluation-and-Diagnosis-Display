import React from 'react';
import Plot from 'react-plotly.js';
import Box from '@material-ui/core/Box';
import GeneralTable from '../comparisonComps/GeneralTable';

function createData(column, dataset) {
    return { column, ...dataset };
}

export default function FeatureImpDatasetComparison(props){
    const evalList = props.evalList;

    const len = evalList.length;
    const rows = [];
    const headCells = [];
    const z = [];
    const x = [];
    const y = [];
    const trace = [];
    headCells.push({id:'column', label:'Columns'});
    for(let i=0;i<len;i++){
        console.log(evalList[i].data.metadata.feature_scores);
        z.push(evalList[i].data.dataset.name);
        y.push([]);
        x.push([]);
        headCells.push({id:i, label:z[i]});
        for(let j=0;j<evalList[i].data.metadata.feature_scores.length;j++){
            y[i].push(evalList[i].data.metadata.feature_scores[j]);
            x[i].push(evalList[i].data.dataset.metadata.columns[j]);
        }
        trace.push({
            x:x[i],
            y:y[i],
            type:'scatter',
            mode:'lines',
            name:z[i]
        });
    }

    for(let i=0;i<evalList[0].data.metadata.feature_scores.length;i++){
        let temp_feat_scores = [];
        for(let j=0;j<len;j++){
            temp_feat_scores.push(evalList[j].data.metadata.feature_scores[i].toFixed(2));
        }
        rows.push(createData(
            evalList[0].data.dataset.metadata.columns[i],
            temp_feat_scores
        ))
    }

    let data = [...trace];

    return(
    <div>
        <div className="row">

            <div className="col">
                <Box m={2} pr={10}>
                    <Plot
                        data={data}
                        layout={{
                            width:600,
                            height:600,
                            title:"Feature Importances"
                        }}
                        config={{
                            scrollZoom:true,
                            responsive:true
                        }}
                    />
                </Box>
                
            </div>

            <div className="col">
                <Box m={2} pr={10}>
                    <GeneralTable 
                        headCells={headCells}
                        rows={rows}
                        tabletitle="Feature Importances"
                    />
                </Box>
            </div>

        </div>
    </div>
    );
}
