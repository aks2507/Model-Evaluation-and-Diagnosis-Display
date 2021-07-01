import React from 'react';
import Paper from '@material-ui/core/Paper';
import Plots from './Plots';

export default function PrecisionRecallCurve(props) {
    let evalList = props.evaluations;
    let numTabs = evalList.length;
    let c=props.c;
    let precision = [];
    let recall = [];
    let auc = [];

    const n_classes=evalList[0].data.metadata.n_classes;
    if(n_classes===2)
    {
        for (let i = 0; i < numTabs; i++) {
            var precision_temp = evalList[i].data.metadata.precision_curve;
            var recall_temp = evalList[i].data.metadata.recall_curve;
            precision.push(precision_temp);
            recall.push(recall_temp);
            auc.push(evalList[i].data.metadata.precision_recall_auc);
        }
        
    }   
    else
    {
        for (let i = 0; i < numTabs; i++) {
            precision_temp = evalList[i].data.metadata.precision_curve["micro"];
            recall_temp = evalList[i].data.metadata.recall_curve["micro"];
            precision.push(precision_temp);
            recall.push(recall_temp);
            auc.push(evalList[i].data.metadata.precision_recall_auc["micro"]);
        }
       
    }

    const title=n_classes===2?('Precision Recall Curve' ):('Micro average Precision Recall Curve');
    let trace = [];

    for (let i = 0; i < numTabs; i++) {
        if(c===0)
            if(n_classes>2)
                trace.push({ 
                    x: precision[i], 
                    y: recall[i], 
                    type: 'scatter', 
                    name:evalList[i].data.dataset.name+'(AUC='+evalList[i].data.metadata.precision_recall_auc["micro"].toFixed(2)+')' ,
                    
                });
            else
                trace.push({ 
                    x: precision[i], 
                    y: recall[i], 
                    type: 'scatter', 
                    name: evalList[i].data.name+'(AUC='+evalList[i].data.metadata.precision_recall_auc.toFixed(2)+')' 
                });
        else
           if(n_classes>2)
           {
            trace.push({ 
                x: precision[i], 
                y: recall[i], 
                type: 'scatter', 
                name:evalList[i].data.dataset.name+'(AUC='+evalList[i].data.metadata.precision_recall_auc["micro"].toFixed(2)+')' ,
                
            });
            
           }
           else
            trace.push({ 
                x: precision[i], 
                y: recall[i], 
                type: 'scatter', 
                name: evalList[i].data.name+'(AUC='+evalList[i].data.metadata.precision_recall_auc.toFixed(2)+')' 
            });
    }
    let data = [...trace]
    return (
        <Paper elevation={5}>
            <Plots
                data={data}
                title={title}
            />
        </Paper>
    );
}
