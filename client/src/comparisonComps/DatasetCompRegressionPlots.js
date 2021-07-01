import React from 'react';
import Plot from 'react-plotly.js';
import {Grid, Paper, Box} from '@material-ui/core';

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
    let observedVsPredictedSubplots = [];
    let residualVsObservedSubplots = [];
    let residualVsPredictedSubplots = [];
    let numBins = Number(Math.ceil(evalList.length/3));
    for(let i=0;i<numBins;i++){
        observedVsPredictedSubplots.push([]);
        residualVsObservedSubplots.push([]);
        residualVsPredictedSubplots.push([]);
    }
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
            observedVsPredictedSubplots[i].push('xy');
            residualVsObservedSubplots[i].push('xy');
            residualVsPredictedSubplots[i].push('xy');
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
            observedVsPredictedSubplots[Number(Math.floor(i/3))].push("x"+(i+1)+"y"+(i+1));
            residualVsObservedSubplots[Number(Math.floor(i/3))].push("x"+(i+1)+"y"+(i+1));
            residualVsPredictedSubplots[Number(Math.floor(i/3))].push("x"+(i+1)+"y"+(i+1));
        }
    }

    let observedVsPredictedLayout = {
        title: 'Observed vs Predicted',
        grid: {rows: numBins, columns: 3, subplots: observedVsPredictedSubplots , pattern: 'independent', roworder:'top to bottom'},
        legend:{"orientation":"h"}
    };
    let residualVsObservedLayout = {
        title: 'Residual vs Observed',
        grid: {rows: numBins, columns: 3, subplots: residualVsObservedSubplots , pattern: 'independent', roworder:'top to bottom'},
        legend:{"orientation":"h"}
    };
    let residualVsPredictedLayout = {
        title: 'Residual vs Predicted',
        grid: {rows: numBins, columns: 3, subplots: residualVsPredictedSubplots , pattern: 'independent', roworder:'top to bottom'},
        legend:{"orientation":"h"}
    };

    let config = {scrollZoom: true, responsive: true}
        
    return(

    <Grid container spacing={2} style={{width: '100%'}}>
        
        <Grid item xs={12} style={{width: '100%'}}>
            <Paper elevation={5} style={{width: '100%'}}>
                <Box align='center' style={{width: '100%'}}>
                    <Plot   
                        style={{width: '100%', height: 500*numBins }}
                        data={observedVsPredictedTraces}
                        layout={observedVsPredictedLayout}
                        config={config}
                    />
                </Box>
            </Paper>
        </Grid>
    
        <Grid item xs={12} style={{width: '100%'}}>
            <Paper elevation={5} style={{width: '100%'}}>
                <Box align='center' style={{width: '100%'}}>
                    <Plot   
                        style={{width: '100%', height: 500*numBins }}
                        data={residualVsPredictedTraces}
                        layout={residualVsPredictedLayout}
                        config={config}
                    />
                </Box>
            </Paper>
        </Grid>
    
        <Grid item xs={12} style={{width: '100%'}}>
            <Paper elevation={5} style={{width: '100%'}}>
                <Box align='center' style={{width: '100%'}}>
                    <Plot   
                        style={{width: '100%', height: 500*numBins }}
                        data={residualVsObservedTraces}
                        layout={residualVsObservedLayout}
                        config={config}
                    />
                </Box>
            </Paper>
        </Grid>
    </Grid>

    );
}
