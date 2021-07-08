import React from 'react';
import GainLiftPlots from '../components/GainLiftPlots'
export default function GainLiftChart(props){
    const gainChart = props.gainChart
    let ChartLines;
    ChartLines = props.chartLines;
    const labels = props.labels;
    const numberOfLines = ChartLines.length;
    const plotTitle = gainChart ? 'Cumulative Gain Chart':'Lift Chart';
       
    let x = [], y = [];
    for(let i=0;i<numberOfLines;i++){
        x.push([]);
        y.push([]);
        for(let j=0;j<ChartLines[i].length;j++){
            x[i].push(ChartLines[i][j][0]);
            y[i].push(ChartLines[i][j][1]);
        }
    }
    
    let traces = [];
    for(let i=0;i<numberOfLines;i++){
        traces.push({x:x[i], y:y[i], type: 'scatter', name: labels[i]});
    }

    return(
        <GainLiftPlots 
            data={traces}
            title={plotTitle}
        />
    );
}