import React from 'react';
import Plot from 'react-plotly.js';
import Box from '@material-ui/core/Box';

export default function DatasetCompRegressionPlots(props){
    const c = props.c;
    const evalList=props.evalList;
    const dataset_title=[];

    const predicted = [];
    const observed = [];
    const residuals = [];

    for(let i=0;i<evalList.length;i++)
    {
        predicted.push(evalList[i].data.metadata.predicted);
        observed.push(evalList[i].data.metadata.observed);
        residuals.push(evalList[i].data.metadata.observed.map((item,index) => item - evalList[i].data.metadata.predicted[index]));

        const data_name = c === 0 ? evalList[i].data.dataset.name : evalList[i].data.model.name;
        dataset_title.push(data_name);
    }
    
    let observedVsPredictedTraces = [];
    let residualVsPredictedTraces = [];
    let residualVsObservedTraces = [];
    
    for(let i=0;i<evalList.length;i++)
    {  
        if(i===0){
            observedVsPredictedTraces.push(
                {
                    y: predicted[i],
                    x: observed[i],
                    name: c === 0 ? evalList[i].data.dataset.name : evalList[i].data.model.name,
                    type: 'scatter',
                    mode: 'markers'
                }
            );
            residualVsObservedTraces.push(
                {
                    y: observed[i],
                    x: residuals[i],
                    name: c === 0 ? evalList[i].data.dataset.name : evalList[i].data.model.name,
                    type: 'scatter',
                    mode: 'markers'
                }
            );
            residualVsPredictedTraces.push(
                {
                    y: predicted[i],
                    x: residuals[i],
                    name: c === 0 ? evalList[i].data.dataset.name : evalList[i].data.model.name,
                    type: 'scatter',
                    mode: 'markers'
                }
            );
        }
        else{
            observedVsPredictedTraces.push(
                {
                    y: predicted[i],
                    x: observed[i],
                    yaxis: "y"+(i+1),
                    xaxis: "x"+(i+1),
                    name: c === 0 ? evalList[i].data.dataset.name : evalList[i].data.model.name,
                    type: 'scatter',
                    mode: 'markers'
                }
            );
            residualVsObservedTraces.push(
                {
                    y: observed[i],
                    x: residuals[i],
                    yaxis: "y"+(i+1),
                    xaxis: "x"+(i+1),
                    name: c === 0 ? evalList[i].data.dataset.name : evalList[i].data.model.name,
                    type: 'scatter',
                    mode: 'markers'
                }
            );
            residualVsPredictedTraces.push(
                {
                    y: predicted[i],
                    x: residuals[i],
                    yaxis: "y"+(i+1),
                    xaxis: "x"+(i+1),
                    name: c === 0 ? evalList[i].data.dataset.name : evalList[i].data.model.name,
                    type: 'scatter',
                    mode: 'markers'
                }
            );
        }
    }

    console.log( residualVsObservedTraces, residualVsPredictedTraces );

    let observedVsPredictedLayout = {
        title: 'Observed vs Predicted',
        grid: {rows: 1, columns: evalList.length, pattern: 'independent'}
    };
    let residualVsObservedLayout = {
        title: 'Residual vs Observed',
        grid: {rows: 1, columns: evalList.length, pattern: 'independent'}
    };
    let residualVsPredictedLayout = {
        title: 'Residual vs Predicted',
        grid: {rows: 1, columns: evalList.length, pattern: 'independent'}
    };

    let config = {scrollZoom: true, responsive: true}
        
    return(

    <div>
        <Box align="center">
            <Plot   
                data={observedVsPredictedTraces}
                layout={observedVsPredictedLayout}
                config={config}
            />
        </Box>
        <Box align="center">
            <Plot   
                data={residualVsPredictedTraces}
                layout={residualVsPredictedLayout}
                config={config}
            />
        </Box>
        <Box align="center">
            <Plot   
                data={residualVsObservedTraces}
                layout={residualVsObservedLayout}
                config={config}
            />
        </Box>
    </div>

    );
}
